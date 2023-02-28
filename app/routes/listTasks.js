import inquirer from 'inquirer'
import colors from "colors";
import { Tasks } from '../models/Tasks.js';
import { mainMenu } from '../routes/main.js'
import { showTask } from '../controllers/showTask.js';

/**
 * Llista totes les tasques en funció del seu estat i de l'acció que es vol relitzar
 * @param {String<'p','c'>} estat - Estat de la tasca, null totes, 'p' les pendents i 'c' les completades
 * @param {String<'r','u','d'>} metode - Quin mètode CRUD es vol aplicar: Crear, llegir (Read), actualitzar (Update), eliminar (Delete)
 * @returns 
 */
const listTasks = async (estat = null, metode = "u") => {
    let tasks;
    if (global.db === 'json') {
        const allTasks = new Tasks();
        switch (estat) {
            case 'c':
                tasks = allTasks.getFinishedTasks();
                break;

            case 'p':
                tasks = allTasks.getPendingTasks();
                break;

            default:
                tasks = allTasks.getAllTasks();
                break;
        }
    }

    let choices = []
    for (let task of tasks) {
        choices.push({
            value: task,
            name: `${task.task}`
        })
    }
    choices.push({ value: 0, name: `${"Tornar enrere".red}` })

    const listOfTasks = [{
        type: 'list',
        name: 'task',
        message: 'Hi ha aquestes tasques:',
        choices
    }]
    console.clear()
    const chosenTask = await inquirer.prompt(listOfTasks)

    if (chosenTask.task === 0) {
        return mainMenu()
    }
    switch (metode) {
        case 'u':
            //update task
            break;
        
        case 'd':
            //delete task
            break;

        case 'r':
            showTask(chosenTask.task)
            break;

        default:
            //si algun error
            return mainMenu();
    }
}

export { listTasks }