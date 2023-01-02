const getUpload = (req,res) => {
    res.render('index', {title: "Pujar imatge"})
}

const postUpload = (req,res) => {
    const imatge = req.files.fitxer;
    const rutaPujada = './upload/fitxer.'+imatge.mimetype.split("/")[1];

    //comentar imatge.mv() si no es vol desar el fitxer al servidor.
    imatge.mv(rutaPujada, err => {
        if(err){return res.status(500).send(err)}
    })
    res.status(200).send({Nom: imatge.name, Mida: imatge.size, Tipus: imatge.mimetype, Status: "Imatge pujada correctament al servidor"})
}

module.exports = { getUpload, postUpload }