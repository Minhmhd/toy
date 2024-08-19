const mongoose = require('mongoose')
const OriginSchema = new mongoose.Schema({
    country: String
})
const OriginModel = mongoose.model('origins', OriginSchema)  
module.exports = OriginModel