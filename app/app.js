const express = require('express')
const { port } = require('./config/config')
const { designDB } = require('./utils/designDB')


const app = express()
designDB();

app.use('/', require('./routes'))

app.get('/', (req, res) => {
  res.send("Sprint 4_2")
})

app.listen(port, () => {
    console.log(`Servidor corrent al port ${port}`)
})