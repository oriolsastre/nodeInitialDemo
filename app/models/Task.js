import { v4 as uuidv4 } from 'uuid';

class Task {
    id;
    task;
    created = null ;
    initiated = null;
    finished = null;
    //name;

    constructor( task ) {
        this.id = uuidv4();
        this.task = task;
        this.created = Date.now();
        this.initiated = null;
        this.finished = null;
        //this.name = user;
    }

    initiate () {
        this.initiated = Date.now();
    }

    finish () {
        this.finished = Date.now()
    }

    changeName (newName) {
        this.task = newName
    }
}

export { Task }