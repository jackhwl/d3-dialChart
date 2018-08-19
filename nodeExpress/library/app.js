// import productsRouter from 
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

const config = {
  user: 'library',
  password: 'Hkksxds1',
  server: 'pslibrary17.database.windows.net',
  database: 'PSLibrary',

  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};

sql.connect(config).catch(err => debug(err));
const aboutRouter = express.Router();
const storeRouter = express.Router();

app.use(morgan('tiny')); // 'combined'
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist/umd')));
app.set('views', './src/views');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');


storeRouter.route('/')
  .get((req, res) => {
    res.render(
      'store',
      {
        title: 'Bridletowne Park Church',
        nav: [{ link: '/', title: 'Home' },
          { link: '/about', title: 'About' },
          { link: '/products', title: 'Products' },
          { link: '/store', title: 'Store' }]
      }
    );
  });

aboutRouter.route('/')
  .get((req, res) => {
    res.render(
      'about',
      {
        title: 'Bridletowne Park Church',
        nav: [{ link: '/', title: 'Home' },
          { link: '/about', title: 'About' },
          { link: '/products', title: 'Products' },
          { link: '/store', title: 'Store' }]
      }
    );
  });
aboutRouter.route('/me')
  .get((req, res) => {
    res.send('hello about myself');
  });
const nav = [
  { link: '/', title: 'Home' },
  { link: '/about', title: 'About' },
  { link: '/products', title: 'Products' },
  { link: '/store', title: 'Store' }
];

const productsRouter = require('./src/routes/productsRoutes')(nav);

app.use('/about', aboutRouter);
app.use('/products', productsRouter);
app.use('/store', storeRouter);
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views/index.html'));
  // res.render('home', { title: 'MyLibrary', list: ['a', 'b'] });
  res.render(
    'index',
    {
      title: 'Bridletowne Park Church',
      nav: [{ link: '/', title: 'Home' },
        { link: '/about', title: 'About' },
        { link: '/products', title: 'Products' },
        { link: '/store', title: 'Store' }]
    }
  );
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
