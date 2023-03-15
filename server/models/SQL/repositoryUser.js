const { Models } = require('../../database/initModels');
const { encrypt } = require('../../helpers/password');
const User = require('../User');

module.exports = class repositoryUser {
    constructor() {}

    async crear(name, plainPswd, level=1) {
        const password = await encrypt(plainPswd)
        let newUser = new User(null, name, password, level)
        const newUserSQL = await Models.User.create({name, password, level})
        newUser.id = newUserSQL.id;
        return newUser;
    }

    async trobarID(id){
        const model2find = await Models.User.findOne({where: {id}}, {raw: true});
        return new User(model2find);
    }

    async actualitzar(user){
        await Models.User.update(user, {where: {id: user.id}})
    }

}