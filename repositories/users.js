const fs = require("fs");
const crypto = require("crypto");

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
        //Open file of this.filename, read data, parse data,  
        return JSON.parse(await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        }));
    }

    async create(attrs) {
        attrs.id = this.randomId();
        const records = await this.getAll();
        records.push(attrs);
        await this.writeAll(records);
    }

    async writeAll(records){
        // as we arent just trying to retirve info, but also add and update our data we need .writefile based in a promise
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    }

    randomId() {
        return crypto.randomBytes(4).toString('hex');
    }

    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id); 
    }

    async getOneBy( filters){
        const records = await this.getAll();
        for(let record of records){
            let found = true;
            for(let key in filters){
                if(record[key] !== filters[key]){
                    found = false;
                }
            }
            if(found){
                return record;
            }
        }
    }

    async delete(id) {
        const records = await this.getAll();
        const filteredRedcords = records.filter(record => record.id !== id);
        await this.writeAll(filteredRedcords);
    }

    async update(id, attrs){
        const records = await this.getAll();
        const record = records.find(record => record.id === id);
        // unlike the other methods this is not nesscarily demonstrating that some record was able to be found, so an error is needed to show an issue 
        if (!record){
            throw new Error(`Sorry record of id ${id} not found`)
        }

        Object.assign(record, attrs);
        await this.writeAll(records);
    }
}

const test = async () => {
    const repo = new UsersRepositroy('users.json');
   // await repo.update('3f310757', {password: 'password'});
    const user = await repo.getOneBy({password: 'password'});
    console.log(user);
}

test();