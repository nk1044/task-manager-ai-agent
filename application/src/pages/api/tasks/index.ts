import { connectDB } from "@/lib/config/db";
import { TaskController } from "@/lib/controllers/task.controller";
import { withAuth } from "@/lib/middleware/auth.middleware";
import { NextApiResponse } from "next";
import { NextApiRequestWithSession } from "@/lib/config/types";
import { User } from "@/lib/models/user.model";

async function handler(req: NextApiRequestWithSession, res: NextApiResponse) {
    await connectDB();
    const user = req.session.user;
    if(!user || !user.email) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
        return res.status(401).json({ error: "User not found" });
    }
    const userId = existingUser._id.toString();    
    if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    switch (req.method) {
        case "GET":
            if (req.query.id) {
                const taskId = req.query.id as string;
                const task = await TaskController.getTaskById(taskId, userId);
                if (!task) {
                    return res.status(404).json({ error: "Task not found" });
                }
                return res.status(200).json(task);
            }
            const tasks = await TaskController.getTasks(userId);
            if (!tasks) {
                return res.status(404).json({ error: "No tasks found" });
            }
            return res.status(200).json(tasks);

        case "POST":
            const taskData = req.body;
            if (!taskData || !taskData.title || !taskData.description) {
                return res.status(400).json({ error: "Title and description are required" });
            }
            const createdTask = await TaskController.createTask({
                ...taskData,
                owner: userId
            });
            if (!createdTask) {
                return res.status(500).json({ error: "Error creating task" });
            }
            return res.status(201).json(createdTask);
        case "PUT":
            const { id, ...updateData } = req.body;
            if (!id || !updateData) {
                return res.status(400).json({ error: "Task ID and update data are required" });
            }
            const updatedTask = await TaskController.updateTask(id, userId, updateData);
            if (!updatedTask) {
                return res.status(404).json({ error: "Task not found or update failed" });
            }
            return res.status(200).json(updatedTask);
        case "DELETE":
            const taskIdToDelete = req.query.id as string;
            if (!taskIdToDelete) {
                return res.status(400).json({ error: "Task ID is required" });
            }
            const deletedTask = await TaskController.deleteTask(taskIdToDelete, userId);
            if (!deletedTask) {
                return res.status(404).json({ error: "Task not found or delete failed" });
            }
            return res.status(200).json({ message: "Task deleted successfully" });
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}

export default withAuth(handler);