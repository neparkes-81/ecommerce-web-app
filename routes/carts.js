const express = require('express');

const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();

// Recive post request to add item to cart
router.post('/cart/products', async (req, res) => {
    // Figure out if cart is in existence
    let cart;
    if(!req.session.cartId){
        //No cart, so must create cart
        cart = await cartsRepo.create({ items: [] });
        //and store cart id on session
        req.session.cartId = cart.id;
    } else {
        // We have cart, so retrive it
        cart = await cartsRepo.getOne(req.session.cartId)
    }
    // Add item and figure out if already in cart
    const existingItem = cart.items.find(item => item.id === req.body.productId);
    if(existingItem){
        // increment quanity
        existingItem.quantity++;
    }   else {
        // add new product id to array
        cart.items.push({ id: req.body.productId, quantity: 1})
    }
    await cartsRepo.update(cart.id, {
        items: cart.items
    });

    res.redirect('/cart');
});

router.get('/cart', async (req, res) => {
    if(!req.session.cartId){
        return res.redirect('/');
    }
    const cart = await cartsRepo.getOne(req.session.cartId);

    for(let item of cart.items) {
        const product = await productsRepo.getOne(item.id);

        item.product = product;
    }
    res.send(cartShowTemplate({ items: cart.items }));
});

// Recive post to delete item from cart
router.post('/cart/products/delete', async(req,res) => {
    const { itemId } = req.body;
    const cart = await cartsRepo.getOne(req.session.cartId);

    const items = cart.items.filter(item => item.id != itemId);

    await cartsRepo.update(req.session.cartId, { item });

    res.redirect('/cart');
});
module.exports = router;