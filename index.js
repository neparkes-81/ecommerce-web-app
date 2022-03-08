const express = require('express');
const bodyParser = require('body-parser');
// adds a property of session to our req object
const cookieSession = require('cookie-session');

const usersRepo = require('./repositories/users');
const req = require('express/lib/request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    // This provides an encryption key for the cookie string so a user can not just go into the cookie data and change it, possibly giving ability to send requests as another user
    keys: ['sldknlfknsldnflk']
}))

app.get('/signup', (req, res) => {
    res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email">
            <input name="password"placeholder="password">
            <input name="confirmPassword" placeholder="confirm password">
            <button>Sign Up</button>
        </form>
    </div>
    `);
});

app.post('/signup', async (req, res) => {
    const {email, password, confirmPassword} = req.body;
    const existingUser = await usersRepo.getOneBy({email})
    // Verify if valid log-in info
    if(existingUser){
        return res.send('Email Taken');
    }
    if(password !== confirmPassword){
        return res.send('Passwords must match');
    }
    // create user with given data
    const user = await usersRepo.create({email, password});
    // store user id inside cookie
    // req.session is an object that cookie session maintians and provides a place for data that should be stored and check upon any requests sent
    req.session.userId = user.id;

    res.send('Account Created')
})

app.get('/signout', (req,res) => {
    req.session = null;
    res.redirect('/signin');
});

app.get('/signin', (req,res) => {
    res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email">
            <input name="password"placeholder="password">
            <button>Sign In</button>
        </form>
    </div>
    `);
});

app.post('/signin', async (req,res) => {
    const {email, password} = req.body;
    const user = await usersRepo.getOneBy({email})
    if(!user){
        return res.send('Email not found');
    }
    const validPassword = await usersRepo.comparePasswords(user.password, password);
    if(!validPassword){
        return res.send('Invalid password');
    }
    req.session.userId = user.id;
    res.send('urine')
});

app.listen(3000, () => {
    console.log('listening')
})