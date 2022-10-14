const User = require('../models/User');
const Products = require('../models/Product');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const Order = require('./../models/Order');
const Category = require('./../models/category')

module.exports.register = async (req,res) => {
    const user = await User.findOne({email : req.body.email});
    
    if(!user){
        const password = await bcrypt.hash(req.body.password,10);
        req.body.password = password;

        await User.create(req.body);
        req.flash('success','User Created successfully');
        return res.redirect('/user/login');
    }
    req.flash('error','User Already Exist');
    return res.redirect('/user/register');
}

module.exports.login =  (req,res) => {
    // const user = await User.findOne({email : req.body.email})
    // if(user){
    //     const pass = await bcrypt.compare(req.body.password , user.password);
        
    //     if(pass){
            req.flash('success','User Login Successfully')
            return res.redirect('/');
    //     }

    //     req.flash('error','Password Is Incorrect')
    //     return res.redirect('/user/login');
    // }
    // req.flash('error','User Not Found')
    // return res.redirect('/user/login');
}

module.exports.homepage = async (req,res) => {
    const data = await Products.find({}).populate('category')
    const category = await Category.find({});
    // console.log(category);
    res.render('home.ejs',{
        data,
        category,
        user : req.user,
    })
}

module.exports.gotocart = async (req,res) => {
    const data = await Order.find({}).populate('userid');
    console.log(req.user._id);
    console.log('data',data);
    return res.render('cart.ejs',{
        data,
        userid : req.user._id
    })
}


module.exports.logout = async (req,res) => {
    req.logout((error) => {
        if(error){
            return next(error);
        }
        req.flash('error','User Logout Successfully');
        res.redirect('/user/login')
    })
}


module.exports.getProductsByCategory = async (req,res) => {
    
   const category = await Category.find({});
   const products = await Products.find({ category : req.params.id })
  
    return res.render('home.ejs',{
        data : products,
        category
    });
}
