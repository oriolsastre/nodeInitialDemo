const express = require('express')
const { port } = require('./config/config')

const app = express()

app.use('/', require('./routes'))

app.get('/', (req, res) => {
  res.send("Benvingut a l'Sprint 4.1")
})

app.use((req, res) => {
  res.status(404).json({error: "Page not found"})
})

app.listen(port, () => {
    console.log(`Servidor corrent al port ${port}`)
})