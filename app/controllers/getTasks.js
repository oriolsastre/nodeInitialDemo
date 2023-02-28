import { Tasks } from "../models/Tasks.js";

export function getTasks(estat=null){
    if(global.db==='json'){
        const tasks = new Tasks();
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