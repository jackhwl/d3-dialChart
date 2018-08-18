
const express = require('express');

const productsRouter = express.Router();

function router(nav) {
  const products = [
    {
        title: 'Coffees & Teas',
        genre: 'Blended to Perfection',
        description: 'We take pride in our work, and it shows. Every time you order a beverage from us, we guarantee that it will be an experience worth having. Whether it\'s our world famous Venezuelan Cappuccino, a refreshing iced herbal tea, or something as simple as a cup of speciality sourced black coffee, you will be coming back for more.',
        image: '/img/products-01.jpg',
        read: false
    },
    {
        title: 'Bakery & Kitchen',
        genre: 'Delicious Treats, Good Eats',
        description: 'Our seasonal menu features delicious snacks, baked goods, and even full meals perfect for breakfast or lunchtime. We source our ingredients from local, oragnic farms whenever possible, alongside premium vendors for specialty goods.',
        image: '/img/products-02.jpg',
        read: false
    },
    {
        title: 'Bulk Speciality Blends',
        genre: 'From Around the World',
        description: 'Travelling the world for the very best quality coffee is something take pride in. When you visit us, you\'ll always find new blends from around the world, mainly from regions in Central and South America. We sell our blends in smaller to large bulk quantities. Please visit us in person for more details.',
        image: '/img/products-03.jpg',
        read: false
    }
];

  productsRouter.route('/')
    .get((req, res) => {
        res.render(
            'productListView',
            {
                title: 'Bridletowne Park Church',
                nav,
                products
            }
        );
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
