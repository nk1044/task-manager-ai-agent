import mongoose, {Schema, model, models} from 'mongoose';

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
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dueDate: {
        type: Date,
    },
}, {timestamps: true});

if(process.env.MODE === 'development') {
    if(models.Task) {
        delete models.Task;
    }
}

export const Task = model('Task', TaskSchema);