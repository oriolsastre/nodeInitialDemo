module.exports = class Room {
    id;
    name;

    constructor(id, name){
        roomName = name.toString().trim().replace(/[^a-zA-Z0-9]/g, '');
        if(!this.#validRoomName(roomName)) throw new Error('Invalid room name')
        this.id=id;
        this.name=roomName;
    }

    #validRoomName (roomName) {
        if(roomName.length<1 || roomName.length>10) return false
        return true
    }
}