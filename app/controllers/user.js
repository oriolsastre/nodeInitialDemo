/**
 * Obtenir les dades de l'usuari
 * @param {*} req 
 * @param {*} res 
 */
const getUser = (req, res) => {
    var host = req.get('host');
    const dadesUsuari = {
        Nom: "Oriol",
        Edat: 52,
        Origen: host,
        Alternativa: `${req.protocol}://${req.headers.host}${req.originalUrl}`
    }
    res.status(200).json(dadesUsuari);
}

module.exports = {getUser}