import Router from "express";
import { CreateTask, GetAllTasks, UpdateTask, DeleteTask } from "../Controllers/Task.controller.js";


const router = Router();

router.route("/tasks").post(CreateTask);
router.route("/tasks").get(GetAllTasks);
router.route("/task").put(UpdateTask);
router.route("/tasks/:id").delete(DeleteTask);


export default router;
