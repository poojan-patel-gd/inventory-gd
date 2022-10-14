const mongoose = require('mongoose');

const orderschema = mongoose.Schema({
    productname : {
        type : String,
    },
    prize : {
        type : String,
    },
    quantity : {
        type : Number
    },
    amount : {
        type : Number
    },
    image : {
        type : String
    },
    status : {
        type : String,
        default : 'pending'
    },
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }
});

const Order = mongoose.model('Order',orderschema);
module.exports = Order;