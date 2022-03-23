const fs = require("fs");
const crypto = require("crypto");
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepositroy extends Repository{
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
}

// By exporting an instance of this class rather than the entire class this allows us to start using methods on it immediently in other files without that extra step
    // Also for this application we won't need multipe instances of our users repository
module.exports = new UsersRepositroy('users.json');