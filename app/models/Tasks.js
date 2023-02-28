import { Task } from "./Task.js";
import { writeFileSync } from 'fs';

class Tasks {
    constructor() {
        //Singleton!
        if (Tasks.instance instanceof Tasks) {
            return Tasks.instance;
        }
        this.tasks = new Array()
        Tasks.instance = this;
    }

    addTask(task) {
        const newTask = new Task(task, global.username)
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

    initiateTask(task){
        task.initiate()
        this.#exportTasks()
    }

    finishTask (task){
        task.finish()
        this.#exportTasks()
    }

    changeTaskName (task, newName) {
        task.changeName(newName)
        this.#exportTasks()
    }

    deleteTask(task) {
        const i = this.tasks.indexOf(task)
        this.tasks.splice(i, 1)
        this.#exportTasks()
    }

    #exportTasks(){
        const path = `./app/database/tasks.json`;
        writeFileSync(path, JSON.stringify(this.tasks))
    }
}

export { Tasks }