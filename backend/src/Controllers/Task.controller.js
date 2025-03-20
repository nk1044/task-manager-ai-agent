import {Task} from '../Models/Task.model.js';


// Create a new Task -> post

const CreateTask = async function (req, res) {

    const {title, description, status} = req.body;

    try {
        const TaskExists = await Task.findOne({title: title});

        if (TaskExists) {
            return res.status(400).json({message: "Task already exists"});
        }

        const newTask = await Task.create({
            title : title,
            description: description,
            status: status
        });
        await newTask.save();

        const CreatedTask = await Task.findById(newTask?._id);

        if(CreatedTask) {
            return res
            .status(201)
            .json({message: "Task created successfully", data: CreatedTask});
        }
        return res
        .status(500)
        .json({message: "Internal server error"});
        
    } catch (error) {
        console.log(error);
    }
}

// Get All Tasks -> get

// update a Task -> put

// delete a Task -> delete


export {
    CreateTask,
};