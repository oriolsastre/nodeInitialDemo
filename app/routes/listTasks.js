import inquirer from 'inquirer'
import colors from "colors";

import { mainMenu } from '../routes/main.js'
import { showTask } from '../controllers/showTask.js';
import { getTasks } from '../controllers/getTasks.js';
import { editTask } from "../controllers/updateTask.js";
import { deleteTask } from '../controllers/deleteTask.js';

/**
 * Llista totes les tasques en funció del seu estat i de l'acció que es vol relitzar
 * @param {String<'p','c'>} estat - Estat de la tasca, null totes, 'p' les pendents i 'c' les completades
 * @param {String<'r','u','d'>} metode - Quin mètode CRUD es vol aplicar: Crear, llegir (Read), actualitzar (Update), eliminar (Delete)
 * @returns 
 */
const listTasks = async (estat = null, metode = "u") => {
    const tasks = await getTasks(estat);

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
            editTask(chosenTask.task)
            break;

        case 'd':
            deleteTask(chosenTask.task)
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