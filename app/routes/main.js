import inquirer from "inquirer";
import colors from "colors";

import { listTasks } from "./listTasks.js";

const preguntas = [
    {
        type: "list",
        name: "choice",
        message: "¿Què voleu fer?",
        choices: [
            {
                value: "1",
                name: `${"1.".green} Crear tasca`,
            },
            {
                value: "2",
                name: `${"2.".green} Veure totes les tasques`,
            },
            {
                value: "3",
                name: `${"3.".green} Veure tasques completades`,
            },
            {
                value: "4",
                name: `${"4.".green} Veure tasques pendents`,
            },
            {
                value: "5",
                name: `${"5.".green} Completar tasques`,
            },
            {
                value: "6",
                name: `${"6.".green} Esborrar tasca`,
            },
            {
                value: "0",
                name: `${"0.".green} Sortir`,
            },
        ],
    },
];

const mainMenu = async () => {
    console.clear();
    console.log("======================".brightYellow);
    console.log("Seleccioneu una opció".brightMagenta);
    console.log("======================".brightYellow);

    const option = await inquirer.prompt(preguntas);
    console.log(option);
    switch (option.choice) {
        case "2":
            await listTasks(null,"r")
            break;
        case "3":
            await listTasks("c","r")
            break;
        case "4":
            await listTasks("p","r")
            break;
        default:
            break;
    }
    return option;
};


export { mainMenu };