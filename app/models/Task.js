import { v4 as uuidv4 } from 'uuid';

class Task {
    id;
    task;
    created = null ;
    initiated = null;
    finished = null;
    user = 'Anònim/a';

    constructor( task, user ) {
        this.id = uuidv4();
        this.task = task;
        this.created = Date.now();
        this.user=user;
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