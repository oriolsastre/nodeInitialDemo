const { b64toasc, userPswd } = require('../helpers/basicAut')

const getTime = (req,res) => {
    res.json({Missatge: "Enunciat"})
}
//Explicar que l'usuari no pot tenir :. Això s'impediria en el formulari d'inscripció.
const postTime = (req,res) => {
    const [usuari, contrassenya] = userPswd(b64toasc(req.headers.authorization));
    res.status(200).json({
        current_datettime: new Date().toLocaleString(),
        Credencials: {
            Usuari: usuari,
            Contrassenya: contrassenya
        }
    })
}

module.exports = { getTime, postTime }