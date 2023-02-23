import { readFileSync, writeFile, writeFileSync } from 'fs';
import { Task } from '../models/Task.js'
import { Tasks } from '../models/Tasks.js';

const path = './tasks.json';

/**
 * Starts de database to read and load its contents to use them.
 * @param {String} db - What dependency you want to use: [json: default, mysql, mongo] 
 * @returns {Array<Tasks>} Tasks loaded from the database.
 */
const initDB = (db='json') => {
    const tasks = new Tasks();
    if(db==='json'){
        let tasksPlain = readFileSync(path,{encoding: 'utf-8', flag: 'as+'})
        if(tasksPlain.length===0) tasksPlain+='[]'
        writeFileSync(path,tasksPlain)
        const tasksJSON = JSON.parse(tasksPlain)
        for(let importedTaskJSON of tasksJSON){
            const importedTask = new Task(importedTaskJSON)
            tasks.addTask(importedTask)
        }
    }
    return tasks
}

export { initDB }