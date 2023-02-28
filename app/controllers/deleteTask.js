import { confirmar } from "../helpers/pausa.js";
import { Tasks } from "../models/Tasks.js";
import { mainMenu } from "../routes/main.js";

export const deleteTaskInq = async (task) => {
    let tasks;
    if (global.db === "json") {
      tasks = new Tasks();
    }
    tasks.deleteTask(task);
    confirmar("Tasca eliminada", mainMenu)
  };
  