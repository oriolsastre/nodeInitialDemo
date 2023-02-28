import { pickTask } from "./updateTask.js";
import { confirmar } from "../helpers/pausa.js";
import { Tasks } from "../models/Tasks.js";
import { mainMenu } from "../routes/main.js";

export const deleteTaskInq = async () => {
    let tasks;
    if (global.db === "json") {
      tasks = new Tasks();
    }
    let task_id = await pickTask(tasks);
    let task = tasks.tasks.find((task) => task.id === task_id.task);
    tasks.deleteTask(task);
  };
  