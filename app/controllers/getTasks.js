import { Tasks as TasksJSON } from "../models/JSON/Tasks.js";
import { Tasks as TasksMongo } from "../models/Mongo/Tasks.js";

export function getTasks(estat = null) {
    let tasks;
    if (global.db === 'json') {
        tasks = new TasksJSON();
        switch (estat) {
            case 'p':
                return tasks.getUnfinishedTasks()

            case 'c':
                return tasks.getFinishedTasks()

            default:
                return tasks.getAllTasks();
        }
    } else if (global.db === 'mongo') {
        switch (estat) {
            case 'p':
                return TasksMongo.find({ finished: null, initiated: { $ne: null } }).lean();

            case 'c':
                return TasksMongo.find({ finished: { $ne: null } }).lean();

            default:
                return TasksMongo.find({}).lean();
        }
    }
}