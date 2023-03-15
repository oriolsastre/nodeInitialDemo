module.exports = class User {
    id;
    name;
    password;
    level;

    constructor(id, name, password, level=1){
        if(!this.#validUsername(name.toString())) throw new Error('Invalid username.')
        this.id = id;
        this.name = name.toString();
        this.password = password
        this.level = level;
    }

    #validUsername (username) {
        if (username.length<1 || username.length>20) return false
        if (/^[a-z0-9]+$/i.test(username)) return false
        return true
    }   
}