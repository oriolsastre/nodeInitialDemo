const fetch = require('cross-fetch');

const getPokemon = (req,res) => {
    res.status(200).send("Dona'm la id d'un pokemon per buscar-ne les dades a la Pokedex.")
}
const getPokemonID = async (req,res) => {
    //https://github.com/everydeveloper/node-express-course/blob/master/responses/04-get-data-with-var.md
    const pokeID = req.params.id;
    var pokeAPIuri = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;

    const resposta = await fetch(pokeAPIuri);
    const dadesRawPoke = await resposta.json();

    res.status(200).json(dadesRawPoke)
}
module.exports = {getPokemon, getPokemonID}