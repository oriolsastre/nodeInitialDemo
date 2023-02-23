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
}

export { Tasks }