const getUpload = (req,res) => {
    res.render('index', {title: "Pujar imatge"})
}

const uploadImatge = (req,res) => {
    //req.is(type)
    //https://pqina.nl/blog/upload-image-with-nodejs/
    console.log(req.files)
    const fitxerPujat = req.files.fitxer;

    res.render("index", {title: "Nivell 1, Exercici 2"})
}

module.exports = { getUpload, uploadImatge }