const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:mongoBookRoutes');

const mongoBookRouter = express.Router();
const url = 'mongodb://localhost:27017';
const dbName = 'library2App';

function router(nav) {
  mongoBookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  mongoBookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');
          const db = client.db(dbName);
          const collection = await db.collection('books');
          const books = await collection.find().toArray();
          res.render(
            'bookListView',
            {
              nav,
              title: 'Library',
              books
            }
          );
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });

  mongoBookRouter.route('/:id')
    .get((req, res, next) => {
      (async function query() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');
          const { id } = req.params;
          const db = client.db(dbName);
          const collection = await db.collection('books');
          const book = await collection.findOne({ _id: new ObjectID(id) });
          debug(book);
          req.book = book;
          res.render(
            'bookView',
            {
              nav,
              title: 'Library',
              book: req.book
            }
          );
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });
    // .get((req, res) => {
    //   res.render(
    //     'bookView',
    //     {
    //       nav,
    //       title: 'Library',
    //       book: req.book
    //     }
    //   );
    // });

  return mongoBookRouter;
}

module.exports = router;