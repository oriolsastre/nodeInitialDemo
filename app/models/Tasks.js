import { Task } from "./Task.js";
import { writeFileSync } from 'fs';

class Tasks {
    constructor() {
        //Singleton!
        if (Tasks.instance instanceof Tasks) {
            return Tasks.instance;
        }
        this.tasks = new Array()
        this.user = 'Anònim/a';
        Tasks.instance = this;
    }

    setName(name) {
        this.user = name;
    }

    addTask(task) {
        const newTask = new Task(task, this.user)
        this.tasks.push(newTask)
        this.#exportTasks()
    }

    importTask(taskJSON) {
        const importedTask = new Task('blank', 'blank');
        Object.assign(importedTask, taskJSON);
        this.tasks.push(importedTask)
    }

    getAllTasks() {
        return this.tasks
    }

    getFinishedTasks() {
        return this.tasks.filter(task => task.finished !== null)
    }

    getUnfinishedTasks() {
        return this.tasks.filter(task => (task.finished === null && task.initiated !== null))
    }

    getPendingTasks(){
        return this.tasks.filter(task => (task.finished === null && task.initiated === null))
    }

    deleteTask(task) {
        const i = this.tasks.indexOf(task)
        this.tasks.splice(i, 1)
    }

    #exportTasks(){
        const path = `./app/database/tasks.json`;
        writeFileSync(path, JSON.stringify(this.tasks))
    }
}

export { Tasks }