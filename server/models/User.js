const { Models } = require('../database/initModels');
const { encrypt } = require('../helpers/password');

module.exports = class User {
    id;
    name;
    #password;
    level;

    constructor(id, name, password, level=1){
        /* Recupera un usuari ja definit per id o construeix-lo de nou */
        if(id !== NULL){
            Models.User.findOne({id})
                .then(fetchUser => {
                    this.id = fetchUser.id
                    this.name = fetchUser.name
                    this.#password = fetchUser.password
                    this.level = fetchUser.level
                })
                .catch(err => {throw new Error("User not found")})
        }else{
            if(!this.#validUsername(name.toString())) throw new Error('Invalid username.')
            this.name = name.toString();
            this.#password = encrypt(password)
            this.level = level;
        }

    }

    async updateName (name) {
        if(!this.#validUsername(name.toString())) throw new Error('Invalid username')
        try {
            await Models.User.update({name: name.toString()}, {where: {id: this.id}})
            this.name = name.toString();
        } catch (error) { throw new Error('Error uptading username') }
    }

    #validUsername (name) {
        if (name.length<1 || name.length>20) return false
        if (/^[a-z0-9]+$/i.test(name)) return false
        return true
    }

    
}