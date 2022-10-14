const mongoose = require('mongoose');

const pructschema = mongoose.Schema({
    productname : {
        type : String,
    },
    prize : {
        type : String,
    },
    quantity : {
        type : Number
    },
    image : {
        type : String
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
});

const Products = mongoose.model('Products',pructschema);
module.exports = Products;