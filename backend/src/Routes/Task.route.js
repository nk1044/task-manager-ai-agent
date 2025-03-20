import Router from "express";
import { CreateTask } from "../Controllers/Task.controller.js";


const router = Router();

router.route("/tasks").post(CreateTask);


export default router;
