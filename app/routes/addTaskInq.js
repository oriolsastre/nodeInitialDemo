import inquirer from "inquirer";
import { inquirerMenu } from "./main.js";
import { myTasks } from "../app.js";
import { Task } from "../models/Task.js";
export const addTaskInq = () => {
  return new inquirer.prompt([
    { type: "input", name: "task", message: "Quina tasca vols afegir?" },
  ]).then(answer => {
    let new_task = new Task(answer.task);
    console.log(new_task)
    myTasks.addTask(new_task);
    console.log(`S'ha afegit ${new_task.task} a la llista de tasques`);
    
  });
};
