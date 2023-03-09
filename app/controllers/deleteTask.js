import { confirmar } from "../helpers/pausa.js";
import { Tasks as TasksJSON } from "../models/JSON/Tasks.js";
import { Tasks as TasksMongo } from "../models/Mongo/Tasks.js";
import { mainMenu } from "../routes/main.js";

export const deleteTask = async (task) => {
  let tasks;
  if (global.db === "json") {
    tasks = new TasksJSON();
    tasks.deleteTask(task);
  } else if (global.db === "mongo") {
    await TasksMongo.deleteOne({ _id: task._id })
  }
  confirmar("Tasca eliminada", mainMenu)
};
