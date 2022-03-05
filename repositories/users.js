const fs = require("fs");

class UsersRepositroy {
    constructor(filename){
        if(!filename) {
            throw new Error('Creating a repository requires a filename')
        }
        this.filename = filename;
        try{
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]')
        }
    }

    async getAll(){
        
    }
}

const repo = new UsersRepositroy('users.json');