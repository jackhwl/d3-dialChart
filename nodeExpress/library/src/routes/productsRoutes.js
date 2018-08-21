
const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:productsRouter');

const productsRouter = express.Router();

function router(nav) {
    productsRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';
            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected correctly to server');

                    const db = client.db(dbName);

                    const collection = await db.collection('products');
                    
                    const products = await collection.find().toArray();
                    res.render(
                        'productListView',
                        {
                            title: 'Bridletowne Park Church',
                            nav,
                            products
                        }
                    );
                } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }());
        });
       productsRouter.route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';
            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected correctly to server');

                    const db = client.db(dbName);

                    const collection = await db.collection('products');

                    const product = await collection.findOne({ _id: new ObjectID(id) });
                    res.render(
                        'productView',
                        {
                            title: 'Bridletowne Park Church',
                            nav,
                            product
                        }
                    );
                        } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }());
        });
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
