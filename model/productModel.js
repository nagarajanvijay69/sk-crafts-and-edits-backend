const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
     name : String,
     category : String,
     price : Number,
     offerPrice : Number,
     image : Array,
     link : String,
     discription : String
})

const productModel = new mongoose.model('productModel', productSchema);

module.exports = productModel;