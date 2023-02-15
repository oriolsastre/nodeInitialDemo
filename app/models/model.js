import { v4 as uuidv4 } from 'uuid';

class Task {
    
    id;
    task;
    created = null ;
    initiated = null;
    finished = null;
    name;

    constructor( task, user ) {
        this.id = uuidv4();
        this.task = task;
        this.created = new Date.toLocaleString();
        this.initiated = null;
        this.finished = null;
        this.name = user;
    }

}

export class Task {...}