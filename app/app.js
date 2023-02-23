import {initDB} from './database/initDB.js'
import { mainMenu } from './routes/main.js'

export let myTasks = new Tasks(initDB())

mainMenu()