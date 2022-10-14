const express = require('express');
const routes = express.Router()
const user = require('./user');
const product = require('./product')
const usercontroller = require('../controller/usercontroller');
const passport = require('passport');
passportlocal = require('../controller/passport-local');
const admincontroller = require('../controller/admincontroller');


routes.get('/',passport.checkAuthentication,usercontroller.homepage);
routes.get('/adminpanel',passport.checkAuthenticationadmin,admincontroller.getproducts)
routes.get('/cart',passport.checkAuthentication,usercontroller.gotocart)
routes.get('/orders',passport.checkAuthenticationadmin,admincontroller.getorder)
routes.use('/user',user);
routes.use('/product',product);
routes.get('/product/:id',usercontroller.getProductsByCategory)

module.exports = routes;