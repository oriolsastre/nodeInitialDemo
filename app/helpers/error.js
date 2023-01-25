const { dbLang } = require('../config/config')

const handleErrorResponse = (res, error, code=401) => {
    if(typeof error === 'string'){return res.status(code).json({error: error})} 

    console.log(error);
    if(error.code===11000){ return res.status(409).json({error: `Valor ${JSON.stringify(error.keyValue)} duplicat. Tria'n un altre.`, errorno: `${error.code}`, db: dbLang}) }
    else if(error.name=='SequelizeUniqueConstraintError'){ return res.status(409).json({error: `Valor ${JSON.stringify(error.fields)} duplicat. Tria'n un altre.`, errorno: `${error.original.errno}`, db: dbLang}) }
    else if(error.original && error.original.errno===1049){return res.status(500).json({error: `No s'ha trobat la base de dades`, errorno: `error.original.errno`, db: dbLang}) }
    else if(error.message){return res.status(code).json({error: `Hi ha hagut un error.`, message: error.message})}
    
    
    return res.status(code).json({error: 'Hi ha hagut un error inesperat.'})
}

module.exports = { handleErrorResponse }