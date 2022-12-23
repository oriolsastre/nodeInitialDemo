/**
 * Middleware que comprova si el fitxer pujat és una imatge i del tipus jpg,png,gif.
 */
const siImatge = (req,res,next) => {
    if(req.files === null){res.status(418).send({Error: "No s'ha tramitat cap fitxer."})}
    
    const format_extensio = req.files.fitxer.mimetype.split("/");
    if(format_extensio[0] == "image"){
        const extensioValida = ['jpg', 'jpeg', 'png', 'gif']
        if(extensioValida.includes(format_extensio[1])){
            next();
        }else{res.status(415).send({Error: "Format d'imatge no acceptat. Ha de ser jpg/jpeg, png o gif."})}
    }else{res.status(415).send({Error: "Document no acceptat. No és una imatge."})}
}

exports.siImatgeMW = siImatge;