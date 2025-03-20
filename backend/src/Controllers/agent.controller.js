import {GoogleGenerativeAI} from '@google/generative-ai';
import { Task } from '../Models/Task.model.js';


const CreateTask = async (title, description, status) => {
    console.log("create a task", title, description, status);
    
    try {
        const TaskExists = await Task.findOne({title: title});
        if (TaskExists) {
            return "Task already exists";
        }
        const newTask = await Task.create({
            title : title,
            description: description,
            status: status
        });
        await newTask.save();
        const CreatedTask = await Task.findById(newTask?._id);
        if(CreatedTask) {
            return  CreateTask.select("__v").select("-__v");
        }
        return "Internal server error";
        
    } catch (error) {
        console.log(error);
    }
}

const UpdateTask = async (id, title, description, status) => {
    try {
        const TaskExists = await Task.findById(id);
        if (!TaskExists) {
            return "Task not found";
        }

        const updatedTask = await Task.findByIdAndUpdate(id, {
            title: title,
            description: description,
            status: status
        }, {new: true});

        if (updatedTask) {
            return updatedTask.select("-__v");
        }
        return "Error while updating task";
    } catch (error) {
        console.log(error);
        return "Internal Server Error";
    }
}

const DeleteTask = async (id) => {
    try {
        const TaskExists = await Task.findById(id);
        if (!TaskExists) {
            return "Task not found";
        }

        const deletedTask = await Task.findByIdAndDelete(id);
        if(deletedTask) {
            return "Task deleted successfully";
        }
        return "Internal server error while deleting task";
        
    } catch (error) {
        console.log(error);
        return "Internal server error while deleting task";
    }
}

const GetAllTasks = async() => {
    try {
        const tasks = await Task.find();
        if (tasks) {
            return tasks;
        }
    } catch (error) {
        console.log(error);
        return "Internal server error";
    }
}

const SearchTask = (searchTerm) => {
    try {
        const task = Task.findOne({description: { $regex: searchTerm, $options: 'i' }});
        if (task) {
            return task;
        }
        else {
            return "Task not found";
        }
    } catch (error) {
        console.log(error);
        return "Internal server error";
    }
}


const SystemPrompt = 
`you are an ai Task/To-Do Management assistant with START, PLAN, ACTION, OBSERVE and Output State capabilities.
you must Stricly follow the Task Schema, Tools provided to you and the Json response type.
you must give the response in JSON format.
You can create a new task, update a task, get all tasks, delete a task, and search for a task.
wait for the user prompt and first PLAN using available tools, 
After Planning, Take the action with appropriate tools and wait for the observation based on the action taken.
Once you get the observation, Return the AI response based on the Start Prompt and observations

Task Schema:
- _id: string, auto-generated, and unique
- title: string, required
- description: string, required
- status: string, required
- createdAt: Date, auto-generated
- updatedAt: Date, auto-generated

Available Tools:
- CreateTask(title: string, description: string, status: string): Create a new task with the given title, description, and status. returns the created task(object).
- UpdateTask(id: string, title: string, description: string, status: string): Update the task with the given id with the new title, description, and status. returns the updated task(object).
- GetAllTasks(): Get all tasks. you can see all the tasks that have been created. and you can see the title, description, and status of each task. returns the list of tasks(array).
- DeleteTask(id: string): Delete the task with the given id in the mongodb database. returns a message(string).
- SearchTask(query: string): Search for a task with the given title in the mongodb database. returns the task(object).

Example:
START
{"type": "user", "user": "Add a task for the meeting at 2 PM tomorrow"}
{"type": "plan", "plan": "i will try to get more context about the task from the user."}
{"type": "output", "output": "Can you tell me more about the task?, is it a meeting or a reminder?, and is it important?"}
{"type": "user", "user": "It's a meeting at 2 PM tomorrow on the project and it's important."}
{"type": "plan", "plan": "i will use CreateTask tool to create a new task with the title 'Meeting at 2 PM tomorrow', description 'meeting at 2pm tomorrow to discuss about project, IMORTANT', and status 'pending'."}
{"type": "action", "function": "CreateTask", "input": {"title": "Meeting at 2 PM tomorrow", "description": "meeting at 2pm tomorrow", "status": "pending"}}
{"type": "observation", "observation": {"_id": "60f7b3b3b3b3b3b3b3b3b3b3", "title": "Meeting at 2 PM tomorrow", "description": "meeting at 2pm tomorrow to discuss about project, IMORTANT", "status": "pending", "createdAt": "2021-07-21T14:00:00.000Z", "updatedAt": "2021-07-21T14:00:00.000Z"}}
{"type": "output", "output": "Task 'Meeting at 2 PM tomorrow' has been created successfully."}

RESPONSE TYPE: {} 
YOU MUST FOLLOW THE RESPONSE TYPE STRICTLY AND RETURN THE RESPONSE IN JSON FORMAT
`;

const tools = {
    CreateTask: CreateTask,
    UpdateTask: UpdateTask,
    GetAllTasks: GetAllTasks,
    DeleteTask: DeleteTask,
    SearchTask: SearchTask
}

const messages = [{
    role: "system",
    message: SystemPrompt
}];

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: "you are an ai assistant to help with Task/To-Do Management.",
 });


const generateText = async (req, res) => {
    const {text} = req.body;
    const userMessage = {
        type: "user",
        user: {user: text}
    }
    messages.push({role: "user", message: JSON.stringify(userMessage)});

   try {
     while (true) {
         const result = await model.generateContent(text);
         const response = result.response.text();
        //  console.log(response);
         
         messages.push({role: "assistant", message: response});
        if(!response.startsWith("{")){
            return res.status(200).send(response);
        }
         const responseJSON = JSON.parse(response);
         console.log(responseJSON);

         if (responseJSON.type === 'output') {
             return res.status(200).send(responseJSON?.output || "your response is empty");
             break;
         }
         else if(responseJSON.type === 'action'){
            
             const tool = tools[responseJSON.function];
             if (!tool) {
                 messages.push({role: "assistant", message: "Invalid tool call"});
                 continue;
             }
             const observation = await tool(responseJSON.input);
             
             const observationMessage = {
                 type: "observation",
                 observation
             }
             messages.push({role: "assistant", message: JSON.stringify(observationMessage)});
         }
     }
   } catch (error) {
       console.log(error);
   }
    res.send("error occured");
}

export {generateText};