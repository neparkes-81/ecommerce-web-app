const express = require('express');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

const router = express.Router()

router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
});

router.post('/signup', [
        check('email'),
        check('password'),
        check('confirmPassword')
    ], async (req, res) => {
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

router.get('/signout', (req,res) => {
    req.session = null;
    res.redirect('/signin');
});

router.get('/signin', (req,res) => {
    res.send(signinTemplate());
});

router.post('/signin', async (req,res) => {
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

module.exports = router;