const postUpload = (req,res) => {
    const imatge = req.files.fitxer;
    const nameTimeStamp = new Date().toISOString().replace(/\.|:/g,'');
    const rutaPujada = './upload/'+nameTimeStamp+'.'+imatge.mimetype.split("/")[1];

    //comentar imatge.mv() si no es vol desar el fitxer al servidor.
    imatge.mv(rutaPujada, err => {
        if(err){return res.status(500).send(err)}
        else{
            res.status(200).send({
                Nom: imatge.name,
                Mida: imatge.size,
                Tipus: imatge.mimetype,
                Ruta: rutaPujada,
                Status: "Imatge pujada correctament al servidor"})
        }
    })
}

module.exports = { postUpload }