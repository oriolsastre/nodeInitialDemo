/**
 * Obtenir les dades de l'usuari
 * @param {*} req Request d'express
 * @param {*} res Response d'express
 */
const getUser = (req, res) => {
    const dadesUsuari = {
        Nom: "Oriol",
        Edat: 52,
        Origen: `${req.protocol}://${req.headers.host}${req.originalUrl}`
    }
    res.status(200).json(dadesUsuari);
}

module.exports = {getUser}