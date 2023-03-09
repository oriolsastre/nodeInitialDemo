import colors from "colors";

/**
 * Mostra un llistat de tasques en el format desitjat
 * @param {*} tasks 
 */
export function displayTasks(tasks) {
    if (tasks.length === 0) return console.log(`${"No hi ha tasques.".red}`);
    let displayedTasks = [...tasks]
    displayedTasks.forEach(task => {
        task.created = new Date(task.created).toISOString()
        if (task.initiated) task.initiated = new Date(task.initiated).toISOString()
        if (task.finished) task.finished = new Date(task.finished).toISOString()
    });
    console.table(displayedTasks, ["task", "created", "initiated", "finished", "user"]);
}