/**
 * Middleware que comprova si el fitxer pujat és una imatge. És a dir, tipus jpg,png,gif.
 */
const siImatge = (req,res,next) => {
    const imatge = req.files.fitxer;
    if(imatge.mimetype == 'image/jpeg'){console.log("jpeg")}
    else{console.log("500");}
    next();
}

exports.siImatgeMW = siImatge;