Product = require('../models/products.model');

exports.index = function(req, res){
    Product.get(function(err, products) {
        if(err){
            res.json({
                status:"error",
                message:err
            })
        }
        res.json({
            status:"success",
            message: "Products retrieved successfully",
            data: products
        });
    });
};

exports.new = function(req,res){
    var product = new Product();
    product.id = req.body.id ? req.body.id : product.id;
    product.brand = req.body.brand ? req.body.brand : product.brand;
    product.description = req.body.description;
    product.image = req.body.image;

    product.save(function (err) {
        if(err) res.json(err);
        else res.json({
            message: 'New Product created',
            data: product
        })
    })
};

exports.view = function (req, res) {
    Product.findByBrand(req.params.brand, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            message: 'Product details loading..',
            data: product
        });
    });
};

// Old
/*const db = require("../models");
const products = db.products;

// create and save a new product
exports.create = (req, res) => {

};

// retrieve all products
exports.findAll = (req, res) => {

};

// find a single product
exports.findOne = (req, res) => {

};

// Update a product by id
exports.update = (req, res) => {

};

// delete a product with specified id
exports.delete = (req, res) => {

};

// delete all products
exports.deleteAll = (req, res) => {

};

// find all published products 
exports.findAllPublished = (req, res) => {

};

*/