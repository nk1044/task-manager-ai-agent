import {GoogleGenerativeAI} from '@google/generative-ai';
import { Task } from '../Models/Task.model.js';

const CreateTask = async (data) => {
    const {title, description, status} = data;
    try {
        const TaskExists = await Task.findOne({title: title});
        if (TaskExists) {
            return "Task already exists";
        }
        const newTask = await Task.create({
            title: title,
            description: description,
            status: status
        });
        await newTask.save();
        const CreatedTask = await Task.findById(newTask?._id).select("-__v");
        if(CreatedTask) {
            return CreatedTask;
        }
        return "Internal server error";
        
    } catch (error) {
        console.log(error);
        return `Internal server error: ${error.message}`;
    }
}

const UpdateTask = async (data) => {
    console.log("\nUpdateTask data in function: ", data);
    const {id, title, description, status} = data;
    console.log("\nUpdateTask in function: ", id, title, description, status);

    try {
        const TaskExists = await Task.findById(id);
        if (!TaskExists) {
            return "Unable to find task by id";
        }

        const updatedTask = await Task.findByIdAndUpdate(id, {
            title: title,
            description: description,
            status: status
        }, {new: true}).select("-__v");

        if (updatedTask) {
            return updatedTask;
        }
        return "Error while updating task";
    } catch (error) {
        console.log(error);
        return `Internal Server Error: ${error.message}`;
    }
}

const DeleteTask = async (data) => {
    const {id} = data;
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
        return `Internal server error while deleting task: ${error.message}`;
    }
}

const GetAllTasks = async() => {
    try {
        const tasks = await Task.find();
        if (tasks) {
            return tasks;
        }
        return [];
    } catch (error) {
        console.log(error);
        return `Internal server error: ${error.message}`;
    }
}

const SearchTask = async (data) => {
    const {query} = data;
    try {
        if (!query || query.trim() === '') {
            return "Please provide a search term";
        }
        const escapedTerm = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const searchPattern = new RegExp(escapedTerm, 'i');
        const tasks = await Task.find({
            $or: [
                { title: { $regex: searchPattern } },
                { description: { $regex: searchPattern } },
                { status: { $regex: searchPattern } }
            ]
        }).select("-__v").sort({ createdAt: -1 });

        if (tasks && tasks.length > 0) {
            return tasks;
        } else {
            return "No tasks found matching your search criteria";
        }
    } catch (error) {
        console.log("Error in SearchTask:", error);
        return `Search error: ${error.message}`;
    }
}

const SystemPrompt = `
You are an AI Task Management Assistant that helps users manage their tasks and to-do lists.

# Response Format
- You MUST ALWAYS respond with a valid JSON object
- Every response must have a "type" field
- Valid types are: "plan", "action", "output"
- You must not include any text outside the JSON object

# Task Schema
{
  "_id": "string (auto-generated)",
  "title": "string (required)",
  "description": "string (required)",
  "status": "string (required, e.g. 'pending', 'in-progress', 'completed')",
  "createdAt": "Date (auto-generated)",
  "updatedAt": "Date (auto-generated)"
}

# Available Tools
1. CreateTask(title, description, status)
   - Creates a new task
   - Parameters: title (string), description (string), status (string)
   - Returns: Task object or error message

2. UpdateTask(id, title, description, status)
   - Updates an existing task
   - Parameters: id (string), title (string), description (string), status (string)
   - Returns: Updated task object or error message

3. GetAllTasks()
   - Retrieves all tasks
   - Returns: Array of task objects

4. DeleteTask(id)
   - Deletes a task
   - Parameters: id (string)
   - Returns: Success or error message

5. SearchTask(query)
   - Searches for tasks containing the query in the description
   - Parameters: query (string)
   - Returns: Task object or error message

# Precautions
- do not delete anything until the user mention to delete

# Workflow
1. When you receive a user message, first respond with a "plan" type
2. If you need to use a tool, respond with an "action" type
3. After receiving an observation, respond with an "output" type
4. Always use JSON format for all responses

# Examples
User: {role: "user", text: "Add a meeting task for tomorrow"}
Assistant: {"type": "plan", "plan": "I will create a new task for a meeting tomorrow by using the CreateTask tool."}
Assistant: {"type": "action", "function": "CreateTask", "input": {"title": "Meeting", "description": "Meeting scheduled for tomorrow", "status": "pending"}}
System: {"type": "observation", "observation": {"_id": "12345", "title": "Meeting", "description": "Meeting scheduled for tomorrow", "status": "pending", "createdAt": "2023-01-01", "updatedAt": "2023-01-01"}}
Assistant: {"type": "output", "output": "I've added a meeting task for tomorrow. It's currently marked as pending."}


User: {role: "user", text: "i have resudeled my meeting of 2 pm tommorow to next wednesday"}
Assistant: {"type": "plan", "plan": "I need to find the meeting task and update its description to reflect the new date."}
Assistant: {"type": "plan", "plan": "I will use the SearchTask tool to find the meeting task and then update the description using the UpdateTask tool."}
Assistant: {"type": "action", "function": 'SearchTask', input: { query: 'meeting' }}
System: {"type": "observation", "observation": {"_id": "12345", "title": "Meeting", "description": "Meeting scheduled for tomorrow", "status": "pending", "createdAt": "2023-01-01", "updatedAt": "2023-01-01"}}
Assistant: {"type": "plan", "plan": "I found a meeting task. Now I will update the task to reflect the new date."}
Assistant: {"type": "action", "function": 'UpdateTask', input: {"id": "12345", "title": "Meeting", "description": "Meeting rescheduled for wednesday", "status": "pending", "createdAt": "2023-01-01", "updatedAt": "2023-02-01"}}
Assistant: {"type": "output", "output": "I have updated the meeting task to reflect the new date of next Wednesday."}

Remember: ALWAYS respond with valid JSON following the structure described above.
`;

const tools = {
    CreateTask: CreateTask,
    UpdateTask: UpdateTask,
    GetAllTasks: GetAllTasks,
    DeleteTask: DeleteTask,
    SearchTask: SearchTask
};


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: SystemPrompt
});

async function extractJsonText(text) {
    if (!text) return null;
    text = text.trim();

    const pattern = /```json\s*([\s\S]*?)\s*```/;
    let match = text.match(pattern);
    let result = match ? match[1] : text;

    result = result.trim().replace(/\\/g, "");

    const start = result.indexOf('{');
    const end = result.lastIndexOf('}');
    if (start === -1 || end === -1) return null;
    
    result = result.substring(start, end + 1);
    
    try {
        return JSON.parse(result);
    } catch (error) {
        console.error("Invalid JSON:", error);
        return null;
    }
}


const generateText = async (req, res) => {
    const {text} = req.body;
    const message = [];
    message.push({
        role: "user",
        text: text 
    });
    try {
        while(true){
            const Prompt = JSON.stringify(message);
            const result = await model.generateContent(Prompt);
            let data = result.response.text();

            data = await extractJsonText(data);
            console.log("\ndata:- ", data);
            message.push(data);
            if (data?.type === "output") {
                return res.json({message: data.output});
            } 
            else if (data?.type === "action") {
                const tool = data.function;
                const input = data.input;
                const response = await tools[tool](input);
                console.log(`\nresponse of ${tool} tool:- `, response);
                message.push({
                    role: "system",
                    text: JSON.stringify(response)
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export {generateText};