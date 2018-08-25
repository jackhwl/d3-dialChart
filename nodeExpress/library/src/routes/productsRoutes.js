
const express = require('express');
const productController = require('../controllers/productController');
const productService = require('../services/goodreadsService');
const productsRouter = express.Router();

function router(nav) {
    const { getIndex, getById, midleware } = productController(productService, nav);
    productsRouter.use(midleware);
    productsRouter.route('/')
        .get(getIndex);
    productsRouter.route('/:id')
        .get(getById);
    return productsRouter;
}

module.exports = router;
