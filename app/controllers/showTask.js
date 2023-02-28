import { displayTasks } from "../helpers/displayTask.js"
import { confirmar } from "../helpers/pausa.js"
import { listTasks } from "../routes/listTasks.js"

export async function showTask (task){
    console.clear()
    console.log(`Aquests són els detalls de la tasca`)
    displayTasks([task])
    await confirmar("Tornar al llistat de tasques", listTasks, null, 'r')
}