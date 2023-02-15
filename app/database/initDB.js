import { readFileSync } from 'fs';

const path = './tasks.json';

/**
 * Starts de database to read and load its contents to use them.
 * @param {String} db - What dependency you want to use: [json: default, mysql, mongo] 
 * @returns {Array<Tasks>} Tasks loaded from the database.
 */
const initDB = (db='json') => {
    let tasks;
    if(db==='json'){
        let tasksPlain = readFileSync(path,{encoding: 'utf-8', flag: 'as+'})
        if(tasksPlain.length===0) tasksPlain+='[]'
        tasks = JSON.parse(tasksPlain)
    }
    return tasks
}

export { initDB }