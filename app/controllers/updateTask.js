import inquirer from "inquirer";
import { confirmar } from "../helpers/pausa.js";
import { Tasks } from "../models/Tasks.js";
import { mainMenu } from "../routes/main.js";

const pickTask = async (tasks) => {
  let choices = [];
  const question = [
    {
      type: "list",
      name: "task",
      message: "Quina tasca vols editar?",
      choices,
    },
  ];
  tasks.tasks.forEach((task) => {
    choices.push({
      value: `${task.id}`,
      name: `${task.task}`,
    });
  });
  const answer = await inquirer.prompt(question);
  return answer;
};

const editTask = async (task, tasks) => {
  const question = [
    {
      type: "list",
      name: "action",
      message: "Què vols fer?",
      choices: [
        { value: 1, name: "Iniciar" },
        { value: 2, name: "Marcar com a feta" },
        { value: 3, name: "Canviar el nom de la tasca" },
        { value: 0, name: "Tornar enrere" },
      ],
    },
  ];
  const answer = await inquirer.prompt(question);
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
      updateTaskInq();
      break;

    default:
      break;
  }
};

export const updateTaskInq = async () => {
  let tasks;
  if (global.db === "json") {
    tasks = new Tasks();
  }
  let task_id = await pickTask(tasks);
  let task = tasks.tasks.find((task) => task.id === task_id.task);
  editTask(task, tasks);
};
