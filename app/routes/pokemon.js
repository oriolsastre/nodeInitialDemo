const express = require('express');
const fetch = require('cross-fetch');

const router = express.Router();

router.get('/', (req,res) => {
    res.status(200).send("Dona'm la id d'un pokemon per buscar-ne les dades a la Pokedex.")
})

//https://github.com/everydeveloper/node-express-course/blob/master/responses/04-get-data-with-var.md
router.get('/:id', async (req,res) => {
    const pokeID = req.params.id;
    var pokeAPIuri = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;

    const resposta = await fetch(pokeAPIuri);
    const dadesRawPoke = await resposta.json();

    res.json(dadesRawPoke)
})

module.exports = router;