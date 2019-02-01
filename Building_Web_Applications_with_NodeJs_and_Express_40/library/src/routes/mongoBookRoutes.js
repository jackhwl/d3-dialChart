const express = require('express');
const mongoBookController = require('../controllers/mongoBookController');

const mongoBookRouter = express.Router();

function router(nav) {
  const { getIndex, getById, middleware } = mongoBookController(nav);
  mongoBookRouter.use(middleware);

  mongoBookRouter.route('/')
    .get(getIndex);

  mongoBookRouter.route('/:id')
    .get(getById);

  return mongoBookRouter;
}

module.exports = router;
