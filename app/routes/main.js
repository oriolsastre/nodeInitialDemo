import inquirer from "inquirer";
require("colors");

const preguntas = [
    {
        type: "list",
        name: "option",
        message: "¿Què voleu fer?",
        choices: [
            {
                value: "1",
                name: `${"1.".green} Crear tasca`,
            },
            {
                value: "2",
                name: `${"2.".green} Veure tasca`,
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

const inquirerMenu = async () => {
    console.clear();
    console.log("======================".brightYellow);
    console.log("Seleccioneu una opció".brightMagenta);
    console.log("======================".brightYellow);

    const { option } = await inquirer.prompt(preguntas);
    return option;
};

const pausa = async () => {
    const question = [
        {
            type: "input",
            name: "enter",
            message: `Premeu ${"enter".green} per continuar`,
        },
    ];
    console.log("\n");
    await inquirer.prompt(question);
};

const leerInput = async (message) => {
    const question = [
        {
            type: "input",
            name: "desc",
            message: message,

            validate(value) {
                if (value.length === 0) {
                    return "Si us plau, introduïu un valor";
                }
                return true;
            },
        },
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
        };
    });

    choices.unshift({
        value: "0",
        name: "0.".green + " Cancel·la",
    });

    const preguntas = [
        {
            type: "list",
            name: "id",
            message: "borrar",
            choices,
        },
    ];
    const { id } = await inquirer.prompt(preguntas);
    return id;
};

const confirmar = async (message) => {
    const question = [
        {
            type: "confirm",
            name: "ok",
            message,
        },
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: tarea.completadoEn ? true : false,
        };
    });
    const pregunta = [
        {
            type: "checkbox",
            name: "ids",
            message: "selecciones",
            choices,
        },
    ];
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
};

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist,
};
