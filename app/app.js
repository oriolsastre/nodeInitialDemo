const express = require('express')
const { port } = require('./config/config')

const app = express()
//const port = 3000

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.use('/', require('./routes'))

app.get('/', (req, res) => {
  res.send("Benvingut a l'Sprint 4.1")
})



/* Nivell 2 */
/*
app.use(MW) s'aplicarà per a totes les rutes
app.use('/time', customMiddleware) si el middleware és especific d'aquesta ruta
app.get('/time', customMW, (req,res) => {}) també puc especificar el MW per el get en aquesta ruta.

*/

app.listen(port, () => {
    console.log(`Servidor corrent al port ${port}`)
})