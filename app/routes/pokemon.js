const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req,res) => {
    res.status(200).send("Dona'm la id d'un pokemon per buscar-ne les dades a la Pokedex.")
})

//https://github.com/everydeveloper/node-express-course/blob/master/responses/04-get-data-with-var.md
router.get('/:id', (req,res) => {
    const pokeID = req.params.id;

    request({
        method: "GET",
        uri: `https://pokeapi.co/api/v2/pokemon/${pokeID}`   
    }, (err, response, body) => {
        if(err){res.send(err)}
        res.send(response)
    })
    //res.send("Buscaré el Pokemon amb ID "+pokeID)
})

module.exports = router;