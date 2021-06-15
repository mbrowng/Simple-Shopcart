let router = require('express').Router();

router.get('/', function (req, res){
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RestHub crafted with love'
    })
});


var productController = require('./app/controllers/products.controller');

router.route('/products').get(productController.index);

var discountController = require('./app/controllers/discounts.controller');

router.route('/discounts').get(discountController.index);


module.exports = router;