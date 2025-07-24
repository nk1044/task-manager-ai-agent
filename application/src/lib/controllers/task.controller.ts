import {User} from "@/lib/models/user.model";
import {Task} from "@/lib/models/task.model";


interface TaskData {
    _id?: string;
    title: string;
    description: string;
    dueDate?: Date;
    owner: string;
    status?: string;
}

const createTask = async (data:TaskData)=>{
    try {
        const userId = data.owner;
        const user = await User.findById(userId);
        if (!user) {
            console.log("User not found for creating task");
            return null;
        }
        const createdTask = await Task.create({
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            owner: userId,
            status: data.status || "pending"
        });
        return createdTask;
    } catch (error) {
        console.error("Error creating task:", error);
        return null;
    }
}

const getTasks = async (userId: string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log("User not found for fetching tasks");
            return [];
        }
        const tasks = await Task.find({ owner: userId });
        return tasks;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
}

const updateTask = async (taskId: string, data: Partial<TaskData>) => {
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            console.log("Task not found for updating");
            return null;
        }
        const updatedTask = await Task.findByIdAndUpdate(taskId, data, { new: true });
        return updatedTask;
    } catch (error) {
        console.error("Error updating task:", error);
        return null;
    }
}

const deleteTask = async (taskId: string, userId:string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log("User not found for deleting task");
            return null;
        }
        const task = await Task.findById(taskId) as TaskData | null;
        if (!task || task.owner.toString() !== userId) {
            console.log("Task not found for deletion or does not belong to user");
            return null;
        }
        await Task.findByIdAndDelete(taskId);
        return task;
    } catch (error) {
        console.error("Error deleting task:", error);
        return null;
    }
}

const getTaskById = async (taskId: string, userId: string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log("User not found for fetching task by ID");
            return null;
        }
        const task = await Task.findById(taskId) as TaskData | null;
        if (!task || task.owner.toString() !== userId) {
            console.log("Task not found or does not belong to user");
            return null;
        }
        return task;
    } catch (error) {
        console.error("Error fetching task by ID:", error);
        return null;
    }
}

export const TaskController = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getTaskById
};