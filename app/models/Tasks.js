import { Task } from "./Task.js";

class Tasks {
    constructor() {
        //Singleton!
        if (Tasks.instance instanceof Tasks) {
            return Tasks.instance;
        }
        this.tasks = new Array()
        Object.freeze(this);
        Tasks.instance = this;
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