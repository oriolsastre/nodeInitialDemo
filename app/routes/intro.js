import inquirer from "inquirer";
import { Tasks } from "../models/Tasks.js";
import { mainMenu } from "./main.js";

const tasks = new Tasks();

const intro = [{
    type: "input",
    name: "name",
    message: `Benvingut, necessito saber qui ets:\nNom: `
}]

const introMenu = async () => {
    console.clear();
    const yourName = await inquirer.prompt(intro);
    if(yourName.name.length>0){tasks.setName(yourName.name)}
    return mainMenu();
}

export { introMenu }