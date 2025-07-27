import { User } from "@/lib/models/user.model";
import { Task } from "@/lib/models/task.model";

interface TaskData {
  _id?: string;
  title: string;
  description: string;
  dueDate?: Date;
  owner: string;
  status?: string;
}

const createTask = async (data: TaskData) => {
  try {
    console.log("Creating task with data:", data);
    const user = await User.findById(data.owner);
    if (!user) {
      console.log("User not found for creating task");
      return null;
    }
    
    const createdTask = await Task.create({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      owner: data.owner,
      status: data.status || "pending",
    });

    return createdTask;
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
};

const getTasks = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found for fetching tasks");
      return [];
    }
    return await Task.find({ owner: userId });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

const getTaskById = async (taskId: string, userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found for fetching task by ID");
      return null;
    }

    const task = await Task.findById(taskId) as TaskData;
    if (!task || task.owner.toString() !== userId) {
      console.log("Task not found or does not belong to user");
      return null;
    }

    return task;
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    return null;
  }
};

const updateTask = async (taskId: string, userId: string, data: Partial<TaskData>) => {
  try {
    const task = await Task.findById(taskId) as TaskData;
    if (!task || task.owner.toString() !== userId) {
      console.log("Task not found or does not belong to user");
      return null;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { ...data, updatedAt: new Date() },
      { new: true }
    );

    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    return null;
  }
};

const deleteTask = async (taskId: string, userId: string) => {
  try {
    const task = await Task.findById(taskId) as TaskData;
    if (!task || task.owner.toString() !== userId) {
      console.log("Task not found or does not belong to user");
      return null;
    }

    await Task.findByIdAndDelete(taskId);
    return task;
  } catch (error) {
    console.error("Error deleting task:", error);
    return null;
  }
};

export const TaskController = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
