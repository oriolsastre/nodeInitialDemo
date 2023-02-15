import { pausa } from "../helpers/pausa"
import { listTasks } from "../routes/listTasks"

export function showTask (task){
    console.clear()
    console.log(`==========`)
    console.table(task)
    return pausa(listTasks())
}