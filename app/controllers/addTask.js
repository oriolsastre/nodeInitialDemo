import inquirer from "inquirer";
import { confirmar } from "../helpers/pausa.js";
import { Tasks as TasksJSON } from "../models/JSON/Tasks.js";
import { Tasks as TasksMongo } from "../models/Mongo/Tasks.js";
import { mainMenu } from "../routes/main.js";


export const addTask = async () => {
  const question = [{
    type: "input",
    name: "task",
    message: `${"Quina tasca vols afegir?".bgCyan}`,
    validate(value) {
      return (value.length > 0) || 'Escriu un nom de tasca. No pot estar buit.'
    }
  }]

  const answer = await inquirer.prompt(question)
  if (global.db === 'json') {
    const tasks = new TasksJSON();
    tasks.addTask(answer.task)
  } else if (global.db === 'mongo') {
    await TasksMongo.create({ task: answer.task, user: global.username })
  }
  return confirmar(`S'ha afegit la tasca '${answer.task}' a la llista.`, mainMenu)
};
