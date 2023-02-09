const bcryptjs = require('bcryptjs');

/**
 * Rebre una contrassenya i hashejar-la
 * @param {String} pswdPlain Contrassenya a encriptar
 * @returns {Hash} Contrassenya hashejada
 */
const encrypt =async (pswdPlain) => {
    if(pswdPlain===null || pswdPlain===undefined) return null;
    const hash = await bcryptjs.hash(pswdPlain.toString(),5)
    return hash;
}
/**
 * Comparar la contrassenya rebuda amb la versió hashejada per saber si es tracta del mateix
 * @param {String} pswdPlain Contrassenya rebuda
 * @param {Hash} pswdHash Contrassenya hashejada
 * @returns {Promise<boolean>}
 */
const compare = (pswdPlain, pswdHash) => bcryptjs.compare(pswdPlain,pswdHash)

module.exports = { encrypt, compare }