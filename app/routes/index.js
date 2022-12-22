const express = require('express')
const fs = require('fs')

const router = express.Router();
const PATH_ROUTES = __dirname;

fs.readdirSync(PATH_ROUTES).filter(fitxer => {
    const nomFitxer = fitxer.split(".").shift();
    if(nomFitxer !== 'index'){
        router.use(`/${nomFitxer}`, require(`./${fitxer}`))
    }
})

module.exports = router;