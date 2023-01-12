const express = require('express')
const { port } = require('./config/config')
const { designDB } = require('./utils/designDB')
const { pageNotFound } = require('./controllers/errorHandler')

designDB();
const app = express()
app.use(express.json())

app.use('/', require('./routes'))

app.get('/', (req, res) => {
  res.send("Sprint 4_2")
})

app.use(pageNotFound)

app.listen(port, () => {
    console.log(`Servidor corrent al port ${port}`)
})