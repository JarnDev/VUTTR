const mongoose = require('mongoose')

const toolSchema = new mongoose.Schema({
    title: {type:String, text:true},
    link: String,
    description: String,
    tags: [String]
})

module.exports = mongoose.model('tool', toolSchema)