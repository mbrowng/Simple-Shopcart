// productModel.js
var mongoose = require('mongoose');
// Setup schema
var productSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: String,
    image: String
});
// Export Product model
var Product = module.exports = mongoose.model('01-products', productSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}