const express = require('express')
const fileUpload = require('express-fileupload');

const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.send("Benvingut a l'Sprint 4.1")
})

app.get('/user', (req, res) => {
    var host = req.get('host');
    const dadesUsuari = {
        Nom: "Oriol",
        Edat: "52",
        Origen: host
    }
    res.status(200).json(dadesUsuari);
  })

app.post('/upload', fileUpload(), (req,res) => {
    //req.imatge o alguna cosa així serà la imatge.
    //https://pqina.nl/blog/upload-image-with-nodejs/
})

/* Nivell 2 */
/*
app.use(MW) s'aplicarà per a totes les rutes
app.use('/time', customMiddleware) si el middleware és especific d'aquesta ruta
app.get('/time', customMW, (req,res) => {}) també puc especificar el MW per el get en aquesta ruta.

*/


/* Nivell 3 */

app.get('/pokemon', (req,res) => {
    res.send("Dona'm la id d'un pokemon per buscar-ne les dades a la Pokedex.")
})

//https://github.com/everydeveloper/node-express-course/blob/master/responses/04-get-data-with-var.md
app.get('/pokemon/:id', (req,res) => {
    const pokeID = req.params.id;
    res.send("Buscaré el Pokemon amb ID "+pokeID)
})