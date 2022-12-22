const express = require('express')
const fs = require('fs')
const {removeExtension} = require('../helpers/removeExtension')

const router = express.Router();
const PATH_ROUTES = __dirname;

fs.readdirSync(PATH_ROUTES).filter(fitxer => {
    const nomFitxer = removeExtension(fitxer);
    if(nomFitxer !== 'index'){
        router.use(`/${nomFitxer}`, require(`./${fitxer}`))
    }
})

module.exports = router;