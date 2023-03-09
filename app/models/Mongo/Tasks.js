import Mongoose from "mongoose";

const tasksSchema = new Mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    initiated: {
        type: Date,
        default: null
    },
    finished: {
        type: Date,
        default: null
    },
    user: {
        type: String,
        required: true,
        default: 'Anònim/a'
    }
}, { timestamps: { createdAt: 'created' } });

export const Tasks = Mongoose.model('Task', tasksSchema)