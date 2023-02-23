import {initDB} from './database/initDB.js'
import { listTasks } from './routes/listTasks.js';

initDB()

listTasks();