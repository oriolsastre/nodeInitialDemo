import {initDB} from './database/initDB.js'
import { listTasks } from './routes/listTasks.js';
import { inquirerMenu } from './routes/main.js';
import { Tasks } from './models/Tasks.js';

export let myTasks = new Tasks(initDB())

inquirerMenu();