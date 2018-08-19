
const express = require('express');

const productsRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:productsRoutes');

function router(nav) {

    productsRouter.route('/')
        .get((req, res) => {
            const request = new sql.Request();
            request.query('select * from products')
                .then((result) => {
                    debug(result);
                    res.render(
                        'productListView',
                        {
                            title: 'Bridletowne Park Church',
                            nav,
                            products: result.recordset
                        }
                    );
                });
        });

    productsRouter.route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            res.render(
                'productView',
                {
                    title: 'Bridletowne Park Church',
                    nav,
                    product: products[id]
                }
            );
        });

    return productsRouter;
}

module.exports = router;
