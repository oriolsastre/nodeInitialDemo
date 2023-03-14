const bcryptjs = require('bcryptjs');

/**
 * Recieves a plain password to hash it
 * @param {String} pswdPlain Contrassenya a encriptar
 * @returns {Hash} Contrassenya hashejada
 */
const encrypt = async (pswdPlain) => {
    if(pswdPlain===null || pswdPlain===undefined) return null;
    const hash = await bcryptjs.hash(pswdPlain.toString(),5)
    return hash;
}
/**
 * Comapres a hashed password to its plain version
 * @param {String} pswdPlain Contrassenya rebuda
 * @param {Hash} pswdHash Contrassenya hashejada
 * @returns {Promise<boolean>}
 */
const compare = (pswdPlain, pswdHash) => bcryptjs.compare(pswdPlain,pswdHash)

module.exports = { encrypt, compare }