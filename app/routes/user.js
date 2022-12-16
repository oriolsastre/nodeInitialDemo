const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    var host = req.get('host');
    const dadesUsuari = {
        Nom: "Oriol",
        Edat: 52,
        Origen: host,
        Alternativa: `${req.protocol}://${req.headers.host}${req.originalUrl}`
    }
    res.status(200).json(dadesUsuari);
  })

module.exports = router;