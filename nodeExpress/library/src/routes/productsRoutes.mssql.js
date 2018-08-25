
const express = require('express');
const productController = require('../controllers/productController');

const productsRouter = express.Router();

function router(nav) {
    const { getIndex, getById, midleware } = productController(nav);
    productsRouter.use(midleware);
    productsRouter.route('/')
        .get(getIndex);
    productsRouter.route('/:id')
        .get(getById);
    return productsRouter;
}
    
/* mssql 
const sql = require('mssql');
const debug = require('debug')('app:productsRoutes');

function router(nav) {
    productsRouter.route('/')
        .get((req, res) => {
            (async function query() {
                const request = new sql.Request();
                const { recordset } = await request.query('select * from products');
                res.render(
                    'productListView',
                    {
                        title: 'Bridletowne Park Church',
                        nav,
                        products: recordset
                    }
                );
            }());
        });

    productsRouter.route('/:id')
        .all((req, res, next) => {
            (async function query() {
                const { id } = req.params;
                const request = new sql.Request();
                const { recordset } = await request.input('id', sql.Int, id)
                    .query('select * from products where id = @id');
                    debug(recordset);
                [req.product] = recordset;
                next();
            }());
        })
        .get((req, res) => {
            res.render(
                'productView',
                {
                    title: 'Bridletowne Park Church',
                    nav,
                    product: req.product
                }
            );
        });

    return productsRouter;
}
*/

module.exports = router;
