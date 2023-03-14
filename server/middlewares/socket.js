const { verifyToken } = require('../helpers/jwt')

module.exports = (socket, next) => {
    try {
        const query = socket.handshake.query;
        const verified = verifyToken(query.token);
        if(verified){
            //No només el token ha de ser vàlid, sinó també contenir la informacio de user correcte
            if(verified.name===query.name){
                socket.userData = verified;
                return next()
            }
        }
        let errorAuth = new Error("Hi ha hagut un error d'autenticaició")
        errorAuth.data = {code: 401};
        return next(errorAuth)
    } catch (error) {
        console.error(error.message)
        return next(error)
    }  
}

//https://stackoverflow.com/questions/13745519/send-custom-data-along-with-handshakedata-in-socket-io
//Mirar?