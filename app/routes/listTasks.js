import inquirer from 'inquirer'
import { Tasks } from '../models/Tasks.js';
import { mainMenu } from '../routes/main.js'

const tasks = new Tasks()

/**
 * Llista totes les tasques en funció del seu estat i de l'acció que es vol relitzar
 * @param {String<'p','c'>} estat - Estat de la tasca, null totes, 'p' les pendents i 'c' les completades
 * @param {String<'c','r','u','d'>} metode - Quin mètode CRUD es vol aplicar: Crear, llegir (Read), actualitzar (Update), eliminar (Delete)
 * @returns 
 */
const listTasks = async (estat = null, metode = "r") => {
    let choices = []
    for (let task in tasks.tasks) {
        if (!estat) {
            choices.push({
                value: `${task.id}`,
                name: `${task.name}`
            })
        } else if (estat == "p" && task.completed === null && task.pending !== null) {
            choices.push({
                value: `${task.id}`,
                name: `${task.name}`
            })
        } else if (estat == "c" && task.completed !== null) {
            choices.push({
                value: `${task.id}`,
                name: `${task.name}`
            })
        }
    }
    choices.push({ value: "0", name: "Tornar enrere" })

    const listOfTasks = [{
        type: 'list',
        name: 'listTasks',
        message: 'Hi ha aquestes tasques:',
        choices
    }]

    const chosenTask = await inquirer.prompt(listOfTasks)

    if (chosenTask == "0") {
        return mainMenu()
    }
    return chosenTask
    //return showTask(tasca)
}

export { listTasks }