const bcryptjs = require('bcryptjs');

/**
 * Rebre una contrassenya i hashejar-la
 * @param {*} pswdPlain Contrassenya a encriptar
 * @returns Contrassenya hashejada
 */
const encrypt =async (pswdPlain) => {
    if(pswdPlain===null || pswdPlain===undefined) return null;
    const hash = await bcryptjs.hash(pswdPlain,5)
    return hash;
}
/**
 * Comparar la contrassenya rebuda amb la versió hashejada per saber si es tracta del mateix
 * @param {*} pswdPlain Contrassenya rebuda
 * @param {*} pswdHash Contrassenya hashejada
 */
const compare = async (pswdPlain, pswdHash) => {
    return await bcryptjs.compare(pswdPlain,pswdHash)
}

const basicUserPswd = (credencials) => {
    const credencialsPlain = Buffer.from(credencials.split(" ")[1], 'base64').toString();
    const i = credencialsPlain.indexOf(":");
    return [credencialsPlain.slice(0,i), credencialsPlain.slice(i+1)]
}

module.exports = { encrypt, compare, basicUserPswd }