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
        this.initiated = new Date.toLocaleString();
        this.finished = new Date.toLocaleString();
        this.name = user;
    }

}

export class Task {...}