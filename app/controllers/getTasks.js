import { Tasks } from "../models/Tasks.js";

export function getTasks(estat = null) {
    let tasks;
    if (global.db === 'json') {
        tasks = new Tasks();
        switch (estat) {
            case 'p':
                return tasks.getUnfinishedTasks()

            case 'c':
                return tasks.getFinishedTasks()

            default:
                return tasks.getAllTasks();
        }
    }
}