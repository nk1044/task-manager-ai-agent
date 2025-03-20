import express from 'express';
import cors from 'cors';
import TaskRouter from './src/Routes/Task.route.js';


const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use('/api/v1', TaskRouter);

app.get('/', (req, res)=>{
    res.send('Server is running successfully');
})

export { app };