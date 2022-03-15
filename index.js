const express = require('express');
const bodyParser = require('body-parser');
// adds a property of session to our req object
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    // This provides an encryption key for the cookie string so a user can not just go into the cookie data and change it, possibly giving ability to send requests as another user
    keys: ['sldknlfknsldnflk']
}));
app.use(authRouter);

app.listen(3000, () => {
    console.log('listening')
})