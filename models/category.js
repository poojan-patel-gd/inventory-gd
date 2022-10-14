const mongoose = require('mongoose');

const categoryschema = mongoose.Schema({
    category : {
        type : String,
    },
});

const Category = mongoose.model('Category',categoryschema);
module.exports = Category;