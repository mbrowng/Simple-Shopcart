// DiscountModel.js
var mongoose = require('mongoose');
// Setup schema
var discountSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    threshold: Number,
    discount: Number
});
// Export Discount model
var Discount = module.exports = mongoose.model('02-discounts', discountSchema);
module.exports.get = function (callback, limit) {
    Discount.find(callback).limit(limit);
}