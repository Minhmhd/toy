const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema({
    name: String,
    cover: String,
})
const CategoryModel = mongoose.model('categories', CategorySchema)  
module.exports = CategoryModel