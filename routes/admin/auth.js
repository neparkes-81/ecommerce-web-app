const express = require('express');
const { check, validationResult } = require('express-validator');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { 
    requireEmail, 
    requirePassword, 
    requireConfirmPassword, 
    requireExistingEmail,
    requireValidUserPassword
    } = require('./validators');

const router = express.Router()

router.get('/signup', (req, res) => {
    res.send(signupTemplate({}));
});

router.post('/signup', [
        requireEmail,
        requirePassword,
        requireConfirmPassword,
    ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.send(signupTemplate({ req, errors }));
    }
    console.log(errors);
    const {email, password, confirmPassword} = req.body;
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
    res.send(signinTemplate({ req }));
});

router.post('/signin', [
        requireExistingEmail,
        requireValidUserPassword
    ], async (req,res) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.send(signinTemplate({ errors }));
    }
    const {email} = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id;

    res.send('urine')
});

module.exports = router;