module.exports = class Response{
    constructor(status, error=null, message=null, data=null){
        this.status = status;
        this.error = error;
        this.message = message;
        this.data = data;
    }
}