const getUpload = (req,res) => {
    res.render('index', {title: "Pujar imatge"})
}

const uploadImatge = (req,res) => {
    const imatge = req.files.fitxer;
    res.status(200).send({Nom: imatge.name, Mida: imatge.size, Tipus: imatge.mimetype, Status: "Imatge pujada correctament al servidor"})
}

module.exports = { getUpload, uploadImatge }