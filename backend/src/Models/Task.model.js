import mongoose, {Schema, model} from 'mongoose';

const TaskSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
}, {timestamps: true});

export const Task = model('Task', TaskSchema);