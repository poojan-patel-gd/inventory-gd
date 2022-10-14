const mongoose = require('mongoose');
const db = require('../config/db')

const userschema = mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    roll : {
        type : String,
        default : 'user'
    }
});

const User = mongoose.model('User',userschema);
module.exports = User;