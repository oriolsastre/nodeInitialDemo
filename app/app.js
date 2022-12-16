const express = require('express')

const app = express()
const port = 3000

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send("Benvingut a l'Sprint 4.1")
})

const routeUser = require('./routes/user');
app.use('/user', routeUser);

const routeUpload = require('./routes/upload')
app.use('/upload', routeUpload)

/* Nivell 2 */
/*
app.use(MW) s'aplicarà per a totes les rutes
app.use('/time', customMiddleware) si el middleware és especific d'aquesta ruta
app.get('/time', customMW, (req,res) => {}) també puc especificar el MW per el get en aquesta ruta.

*/

const routePokemon = require('./routes/pokemon');
app.use('/pokemon', routePokemon);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})