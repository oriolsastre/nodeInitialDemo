import inquirer from "inquirer";
import colors from "colors";
import { Tasks } from "../models/Tasks.js";

import { addTaskInq } from "../controllers/addTaskInq.js";
import { listTasks } from "./listTasks.js";
import { confirmar } from "../helpers/pausa.js";


const mainMenu = async (name) => {
  const tasks = new Tasks();
  const preguntas = [
    {
      type: "list",
      name: "option",
      message: `Hola ${tasks.user}, què vols fer?`,
      choices: [
        {
          value: 1,
          name: `${"1.".green} Crear tasca`,
        },
        {
          value: 2,
          name: `${"2.".green} Veure totes les tasques`,
        },
        {
          value: 3,
          name: `${"3.".green} Veure tasques completades`,
        },
        {
          value: 4,
          name: `${"4.".green} Veure tasques pendents`,
        },
        {
          value: 5,
          name: `${"5.".green} Completar tasques`,
        },
        {
          value: 6,
          name: `${"6.".green} Esborrar tasca`,
        },
        {
          value: 0,
          name: `${"0.".green} Sortir`,
        },
      ],
    },
  ];

  console.clear();
  console.log("======================".brightYellow);
  console.log("Seleccioneu una opció".brightMagenta);
  console.log("======================".brightYellow);

  const answer = await inquirer.prompt(preguntas)
  console.clear()
  switch (answer.option) {
    case 1:
      addTaskInq()
      break;

    case 2:
      console.table(tasks.getAllTasks(), ["task", "created", "initiated", "finished","user"]);
      confirmar('Aquestes són totes les tasques',mainMenu)
      break;
    case 3:
      console.log(tasks.getFinishedTasks());
      break;

    case 4:
      console.log(tasks.getUnfinishedTasks());
      break;

    case 5:
      //Mark as done
      break;

    case 6:
      //Delete task
      break;

    default:
      break;
  }
};

export { mainMenu };