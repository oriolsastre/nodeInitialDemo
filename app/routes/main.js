import inquirer from "inquirer";
import colors from "colors";

import { getTasks } from "../controllers/getTasks.js";
import { addTask } from "../controllers/addTask.js";
import { listTasks } from "./listTasks.js";
import { confirmar } from "../helpers/pausa.js";
import { displayTasks } from "../helpers/displayTask.js";

const mainMenu = async (name) => {
  const preguntas = [
    {
      type: "list",
      name: "option",
      message: `Hola, ${global.username}. Què vols fer?`,
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
          name: `${"3.".green} Veure tasques iniciades`,
        },
        {
          value: 4,
          name: `${"4.".green} Veure tasques completades`,
        },
        {
          value: 5,
          name: `${"5.".green} Editar, iniciar o completar tasques`,
        },
        {
          value: 6,
          name: `${"7.".green} Esborrar tasca`,
        },
        {
          value: 0,
          name: `${"0.".green} ${"Sortir".red}`,
        },
      ],
    },
  ];

  console.clear();
  console.log("======================".brightYellow);
  console.log("Selecciona una opció".brightMagenta);
  console.log("======================".brightYellow);

  const answer = await inquirer.prompt(preguntas)
  console.clear()
  switch (answer.option) {
    case 1:
      addTask()
      break;

    case 2:
      displayTasks(getTasks())
      return confirmar('Aquestes són totes les tasques.', mainMenu)

    case 3:
      displayTasks(getTasks('p'))
      return confirmar('Aquestes són totes les tasques pendents.', mainMenu)

    case 4:
      displayTasks(getTasks('c'))
      return confirmar('Aquestes són totes les tasques completades.', mainMenu)

    case 5:
      listTasks(null, 'u')
      break;

    case 6:
      listTasks(null, 'd')
      break;

    default:
      break;
  }
};

export { mainMenu };