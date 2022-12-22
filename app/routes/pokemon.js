const express = require('express');
const router = express.Router();

const { getPokemon, getPokemonID } = require('../controllers/pokemon')

router.get('/', getPokemon)
router.get('/:id', getPokemonID)

module.exports = router;