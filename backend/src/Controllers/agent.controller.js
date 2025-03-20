import {GoogleGenerativeAI} from '@google/generative-ai';
import {CreateTask, UpdateTask, GetAllTasks, DeleteTask} from './Task.controller.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: "generate text"
 });


const generateText = async (req, res) => {
    const {text} = req.body;
    const result = await model.generateContent(text);
    res.send(result.response.text());
}

export {generateText};