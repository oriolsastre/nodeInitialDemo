class Tasks {
    tasks = []
    constructor(tasks) {
        this.tasks = tasks
    }

    addTask(task) {
        this.tasks.push(task)
    }

    getAllTasks(){
        return this.tasks
    }

    getFinishedTasks(){
        return this.tasks.filter(task=>task.finished !== null)
    }

    getUnfinishedTasks(){
        return this.tasks.filter(task=>task.finished == null)
    }

    deleteTask (task) {
        const i = this.tasks.indexOf(task)
        this.tasks.splice(i, 1)
    }
}

export { Tasks }