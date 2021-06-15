Discount = require('../models/discounts.model');

exports.index = function(req, res){
    Discount.get(function(err, discounts) {
        if(err){
            res.json({
                status:"error",
                message:err
            })
        }
        res.json({
            status:"success",
            message: "Products retrieved successfully",
            data: discounts
        });
    });
};

exports.new = function(req,res){
    var discount = new Discount();
    discount.brand = req.body.brand ? req.body.brand : discount.brand;
    discount.threshold = discount.threshold;
    discount.discount = discount.discount;

    discount.save(function (err) {
        if(err) res.json(err);
        else res.json({
            message: 'New discount created',
            data: discount
        })
    })
};

exports.view = function (req, res) {
    Discount.findByBrand(req.params.brand, function (err, discount) {
        if (err)
            res.send(err);
        res.json({
            message: 'Discounts details loading..',
            data: discount
        });
    });
};
