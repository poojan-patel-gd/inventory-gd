const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.url = 'mongodb://localhost:27017/Inventory-Project' ;
db.mongoose = mongoose;
module.exports = db;