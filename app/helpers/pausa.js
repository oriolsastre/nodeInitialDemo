import inquirer from "inquirer";
/**
 * Espera confirmació de l'usuari i en prémer enter s'executa el menú passat com a paràmetre
 * @param {function} desti - Menú a on anar 
 */
export async function confirmar(missatge='', desti) {
    const enter = [{
        type: 'input',
        name: 'enter',
        message: `${missatge}\nPrem ${'enter'.brightGreen} per continuar`
    }];
    console.log('\n');
    await inquirer.prompt(enter);
    desti()
}