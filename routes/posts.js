const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ugnotes');


const postSchema = mongoose.Schema({
    subject: String,
    filename: String,
    unitname: String,
    thumbnail: String,
})


module.exports = mongoose.model('post', postSchema);