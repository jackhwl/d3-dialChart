const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:productsController');

function productController(productService, nav) {
    function getIndex(req, res) {
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
    }

    function getById(req, res) {
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
                debug(product);

                product.details = await productService.getBookById(product.productId);
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
    }

    function midleware(req, res, next) {
        // if (req.user) {
            next();
        // } else {
        //     res.redirect('/');
        // }
    }

    return {
        getIndex,
        getById,
        midleware
    };
}

module.exports = productController;