import inquirer from 'inquirer'

const listTasks = async (tasks) => {
    let choices = []
    const retorn = "Tornar enrere";
    for(let task in tasks) choices.push(task.name)
    choices.push(retorn)
    
    const tasca = await inquirer.prompt({
        type: 'list',
        name: 'listTasks',
        message: 'These are the tasks:',
        choices
    })
    if(tasca==retorn){
        //return ves al menú principal
    }
    return tasca
    //return showTask(tasca)
}

export { listTasks }