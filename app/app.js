const express = require('express')
const { port } = require('./config/config')
const { designDB } = require('./utils/designDB')


designDB();
const app = express()

app.use('/', require('./routes'))

app.get('/', (req, res) => {
  res.send("Sprint 4_2")
})

app.use((req, res) => {
  res.status(404).json({error: "Page not found"})
})

app.listen(port, () => {
    console.log(`Servidor corrent al port ${port}`)
})