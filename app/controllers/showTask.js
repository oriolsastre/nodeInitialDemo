import { displayTasks } from "../helpers/displayTask.js"
import { confirmar } from "../helpers/pausa.js"
import { listTasks } from "../routes/listTasks.js"

/**
 * Donada una tasca, en mostra els detalls.
 * @param {Task} task 
 */
export function showTask(task) {
    console.clear()
    console.log(`Aquests són els detalls de la tasca`)
    displayTasks([task])
    confirmar("Tornar al llistat de tasques", listTasks, null, 'r')
}