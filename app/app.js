import { initDB } from './database/initDB.js'
import { introMenu } from './routes/intro.js'
import { mainMenu } from './routes/main.js'

initDB()

introMenu()