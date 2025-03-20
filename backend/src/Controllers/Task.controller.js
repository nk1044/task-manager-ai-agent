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

const GetAllTasks = async function (req, res) {
    try {
        const tasks = await Task.find();
        if (tasks) {
            return res.status(200).json({message:"All Tasks Fetched successfully", data: tasks});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

// update a Task -> put

const UpdateTask = async function (req, res) {
    
    const {id, title, description, status} = req.body;

    try {
        const TaskExists = await Task.findById(id);

        if (!TaskExists) {
            return res.status(404).json({message: "Task not found"});
        }

        const updatedTask = await Task.findByIdAndUpdate(id, {
            title: title,
            description: description,
            status: status
        }, {new: true});

        if (updatedTask) {
            return res.status(200).json({message: "Task updated successfully", data: updatedTask});
        }
        return res.status(500).json({message: "Error while updating task"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// delete a Task -> delete

const DeleteTask = async function (req, res) {
    const {id} = req.params
    
    try {

        const TaskExists = await Task.findById(id);
        if (!TaskExists) {
            return res.status(404).json({message: "Task not found"});
        }

        const deletedTask = await Task.findByIdAndDelete(id);
        if(deletedTask) {
            return res.status(200).json({message: "Task deleted successfully"});
        }
        return res.status(500).json({message: "Internal server error while deleting task"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error while deleting task"});
    }
}


export {
    CreateTask,
    GetAllTasks,
    UpdateTask,
    DeleteTask
};