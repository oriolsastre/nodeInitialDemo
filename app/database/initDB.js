import { readFileSync, writeFileSync } from 'fs';
import { Tasks } from '../models/Tasks.js';

const path = `./app/database/tasks.json`;

/**
 * Starts de database to read and load its contents to use them.
 * @param {String} db - What dependency you want to use: [json: default, mysql, mongo] 
 * @returns {Array<Tasks>} Tasks loaded from the database.
 */
const initDB = (db = 'json') => {
    if (db === 'json') {
        const tasks = new Tasks();
        let tasksPlain = readFileSync(path, { encoding: 'utf-8', flag: 'as+' })
        if (tasksPlain.length === 0) tasksPlain += '[]'
        writeFileSync(path, tasksPlain)
        const tasksJSON = JSON.parse(tasksPlain)
        for (let importedTaskJSON of tasksJSON) {
            tasks.importTask(importedTaskJSON)
        }
    }
}

export { initDB }