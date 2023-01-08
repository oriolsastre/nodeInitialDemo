const fetch = require('cross-fetch');

const getPokemon = (req,res) => {
    res.status(200).json({message: "Dona'm la id d'un pokemon per buscar-ne les dades a la Pokedex. L'alçada és en decímetres (10cm) i el pes en hectograms (100g)"})
}
const getPokemonID = async (req,res) => {
    const pokeID = req.params.id;
    if(isNaN(pokeID)){res.status(400).send({Error: "ID invàlida. Ha de ser un nombre."})}  
    
    var pokeAPIuri = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;
    const resposta = await fetch(pokeAPIuri);
    if(resposta.status === 404){ res.status(404).json({Error: "Pokemon no trobat."}) }
    else{
        const pokemonRaw = await resposta.json();
        res.status(200).send({
            nom: pokemonRaw.name,
            alçada: pokemonRaw.height,
            pes: pokemonRaw.weight
        })
    }
}
module.exports = {getPokemon, getPokemonID}