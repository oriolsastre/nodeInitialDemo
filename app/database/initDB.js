import { readFileSync, writeFileSync } from 'fs';
import { Tasks as TasksJSON } from '../models/JSON/Tasks.js';
import { connectMongo } from './connectMongo.js';

const path = `./app/database/tasks.json`;

/**
 * Starts de database to read and load its contents to use them.
 * @returns {Array<Tasks>} Tasks loaded from the database.
 */
export const initDB = async () => {
    if (global.db === 'json') {
        const tasks = new TasksJSON();
        let tasksPlain = readFileSync(path, { encoding: 'utf-8', flag: 'as+' })
        if (tasksPlain.length === 0) tasksPlain += '[]'
        writeFileSync(path, tasksPlain)
        const tasksJSON = JSON.parse(tasksPlain)
        for (let importedTaskJSON of tasksJSON) {
            tasks.importTask(importedTaskJSON)
        }
    } else if (global.db === 'mongo') {
        try {
            connectMongo();
        } catch (error) {
            console.log("Error connectant-se a la base de dades de Mongo.");
            process.exit(0)
        }
    }
}