import inquirer from "inquirer";
import { confirmar } from "../helpers/pausa.js";
import { Tasks } from "../models/Tasks.js";
import { mainMenu } from "../routes/main.js";


export const addTaskInq = async () => {
  const question = [{
    type: "input",
    name: "task",
    message: "Quina tasca vols afegir?"
  }]
  
  const answer = await inquirer.prompt(question)
  if(global.db==='json'){
    const tasks = new Tasks();
    tasks.addTask(answer.task)
  }
  return confirmar(`S'ha afegit la tasca '${answer.task}' a la llista.`, mainMenu)
};
