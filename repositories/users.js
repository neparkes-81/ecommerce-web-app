const fs = require("fs");
const crypto = require("crypto");
const util = require('util')

const scrypt = util.promisify(crypto.scrypt);

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
        // attrs === { email: '', password: ''}
        attrs.id = this.randomId();

        const salt = crypto.randomBytes(8).toString('hex');
        const buf = await scrypt(attrs.password, salt, 64);

        const records = await this.getAll();
        records.push({
            ...attrs,
            password: `${buf.toString('hex')}.${salt}`
        });
        await this.writeAll(records);

        return attrs;
    }

    async comparePasswords(saved, supplied) {
        // saved - password in DB with hashed.salt
        //supplied - password given on sign in
        const [hashed,salt] = saved.split('.');
        const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

        return hashed === hashedSuppliedBuf.toString('hex');

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

// By exporting an instance of this class rather than the entire class this allows us to start using methods on it immediently in other files without that extra step
    // Also for this application we won't need multipe instances of our users repository
module.exports = new UsersRepositroy('users.json');