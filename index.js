const express = require('express');
const bodyParser = require('body-parser');
// adds a property of session to our req object
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products')
const cartsRouter = require('./routes/carts');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    // This provides an encryption key for the cookie string so a user can not just go into the cookie data and change it, possibly giving ability to send requests as another user
    keys: ['sldknlfknsldnflk']
}));
app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} 

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})