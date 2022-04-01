const express = require('express');
const productsRepo = require('../repositories/products');
const productsIndexTemplate = require('../views/products/products')

const router = express.Router();

router.get('/', async (req,res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({ products }));
});

router.get('/cart', (res, req) => {

});

module.exports = router;