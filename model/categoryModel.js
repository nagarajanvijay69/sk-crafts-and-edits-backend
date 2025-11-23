const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
     name : String,
     image : String
})

const categoryModel = new mongoose.model('categoryModel', categorySchema);

module.exports = categoryModel;