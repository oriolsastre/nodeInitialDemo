import inquirer from "inquirer";
import { confirmar } from "../helpers/pausa.js";
import { Tasks as TasksJSON } from "../models/JSON/Tasks.js";
import { Tasks as TasksMongo } from "../models/Mongo/Tasks.js";
import { listTasks } from "../routes/listTasks.js";
import { mainMenu } from "../routes/main.js";

export const editTask = async (task) => {
  const question = [{
    type: "list",
    name: "action",
    message: "Què vols fer?",
    choices: [
      { value: 1, name: "Iniciar" },
      { value: 2, name: "Marcar com a feta" },
      { value: 3, name: "Canviar el nom de la tasca" },
      { value: 0, name: "Tornar enrere" },
    ]
  }];
  const answer = await inquirer.prompt(question);
  if (global.db === 'json') {
    const tasks = new TasksJSON()
    switch (answer.action) {
      case 1:
        tasks.initiateTask(task);
        confirmar("La tasca s'ha marcat com a iniciada", mainMenu);
        break;

      case 2:
        tasks.finishTask(task);
        confirmar("La tasca s'ha marcat com a feta", mainMenu);
        break;
      case 3:
        const new_name = await inquirer.prompt([
          {
            type: "input",
            name: "new_name",
            message: `${"Escriu el nou nom de la tasca".bgCyan}`,
          },
        ]);
        tasks.changeTaskName(task, new_name.new_name);
        confirmar("S'ha canviat el nom de la tasca", mainMenu);
        break;
      case 0:
        return listTasks(null, 'u')

      default:
        break;
    }
  } else if (global.db === 'mongo') {
    switch (answer.action) {
      case 1:
        await TasksMongo.updateOne({ _id: task._id }, { initiated: Date.now() })
        confirmar("La tasca s'ha marcat com a iniciada", mainMenu);
        break;

      case 2:
        await TasksMongo.updateOne({ _id: task._id }, { finished: Date.now() })
        confirmar("La tasca s'ha marcat com a feta", mainMenu);
        break;
      case 3:
        const new_name = await inquirer.prompt([
          {
            type: "input",
            name: "new_name",
            message: `${"Escriu el nou nom de la tasca".bgCyan}`,
          },
        ]);
        await TasksMongo.updateOne({ _id: task._id }, { task: new_name.new_name })
        confirmar("S'ha canviat el nom de la tasca", mainMenu);
        break;
      case 0:
        return listTasks(null, 'u')

      default:
        break;
    }
  }
};