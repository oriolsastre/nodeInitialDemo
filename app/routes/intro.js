import inquirer from "inquirer";
import { Tasks } from "../models/Tasks.js";
import { mainMenu } from "./main.js";

const tasks = new Tasks();

const introMenu = async () => {
    const intro = [{
        type: "input",
        name: "name",
        message: `Benvingut, necessito saber qui ets:\nNom: `
    }]
    console.clear();
    const yourName = await inquirer.prompt(intro);
    global.username="Anònim/a";
    if (yourName.name.length > 0) { global.username = yourName.name }
    return choseDB();
}

const choseDB = async () => {
    const question = [{
        type: "list",
        name: "db",
        message: `Hola, ${global.username}. Quina persistència vols usar?`,
        choices: [{
            value: 'json',
            name: 'JSON'
        }/* ,{
            value: 'mongo',
            name: 'MongoDB'
        } */]
    }]
    const answer = await inquirer.prompt(question)
    global.db = answer.db;
    return mainMenu()
}

export { introMenu }