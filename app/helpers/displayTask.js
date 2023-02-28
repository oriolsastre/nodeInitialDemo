/**
 * Mostra un llistat de tasques en el format desitjat
 * @param {*} tasks 
 */
export function displayTasks (tasks) {
    let displayedTasks = [...tasks]
    displayedTasks.forEach(task => {
        task.created = new Date(task.created).toISOString()
        if(task.initiated) task.initiated = new Date(task.initiated).toISOString()
        if(task.finished) task.finished = new Date(task.finished).toISOString()
    });
    console.table(displayedTasks, ["task", "created", "initiated", "finished", "user"]);
}