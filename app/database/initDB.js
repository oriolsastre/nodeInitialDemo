const fs = require('fs')

const path = './tasks.json';

const initDB = (db='json') => {
    let tasks;
    if(db==='json'){
        let tasksPlain = fs.readFileSync(path,{encoding: 'utf-8', flag: 'as+'})
        if(tasksPlain.length===0) tasksPlain+='[]'
        tasks = JSON.parse(tasksPlain)
    }
    return tasks
}

//initDB()

module.exports = { initDB }