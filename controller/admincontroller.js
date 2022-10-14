
const User = require('../models/User');
const Products = require('../models/Product');
const flash = require('connect-flash');
const Order = require('./../models/Order');
const Category = require('../models/category')


module.exports.addproduct = async (req,res) => {
      await Products.create({
        productname : req.body.productname,
        prize : req.body.prize,
        quantity : req.body.quantity,
        category : req.body.category,
        image : req.file.filename,
    })
    const productdata = await Products.find({}).populate('category')
    
    req.flash('success','Pdoduct Added Successfully')
    res.redirect('/adminpanel')
    
}

module.exports.AddProductPage = async (req,res) => {
    const category = await Category.find({})
    return res.render('admin/addproduct.ejs',{
        category,
    })
}

module.exports.categorypage =  (req,res) => {
    return res.render('admin/addcategory.ejs')
}

module.exports.getproducts = async (req,res) => {
    const data = await Products.find({}).populate('category')
    return res.render('adminpanel.ejs',{
        data,
    })
}

module.exports.editproduct = async (req,res) => {
    const myproduct = await Products.findById(req.params.id)

    return res.render('editproduct.ejs',{
        _id : myproduct._id,
        productname : myproduct.productname,
        prize : myproduct.prize,
        quantity : myproduct.quantity,
        image : myproduct.image,
    })
}

module.exports.removeproduct = async (req,res) => {
     await Products.findByIdAndRemove(req.params.id)

     req.flash('success','Product Removed Successfully')
     return res.redirect('/adminpanel');
}

module.exports.UpdateProduct = async (req,res) => {
    // console.log(req.params.id);
    await Products.findByIdAndUpdate(req.params.id, req.body)

    req.flash('success','Product Update Successfully')
    return res.redirect('/adminpanel');
}

module.exports.Buyproduct = async (req,res) => {
    // const pendingorder = [];
    // console.log(req.params.id);
    // console.log(req.body);
    // console.log(req.user._id);
    const myproduct = await Products.findById(req.params.id)
    // console.log(myproduct);
    const id = myproduct._id;
    // console.log(id);
    const dataqnt = myproduct.quantity;
    const myquantity = Number(req.body.myqnt)
    const Orgqnt = eval(dataqnt - myquantity)
    const updateproduct = await Products.findByIdAndUpdate(id,{
        quantity : Orgqnt
    });
    const amount = updateproduct.prize * myquantity;

    const orderdata = await Order.create({
        productname : myproduct.productname,
        prize : myproduct.prize,
        quantity : myquantity,
        amount : amount,
        image : myproduct.image,
        userid : req?.user?._id,
    })

    req.flash('success','Product Purchased');
    // console.log('orderdata',orderdata);
    return res.redirect('/');
}

module.exports.createCategory = async (req,res) => {
   await Category.create(req.body);
   return res.redirect('/adminpanel');
}

module.exports.getorder = async (req,res) => {
   const data =  await Order.find({}).populate('userid')

   return res.render('order.ejs',{
        data
   })
}

module.exports.delivered = async (req,res) => {
    
   await Order.findByIdAndUpdate(req.params.id,{
        status : 'delivered'
   })
    
    req.flash('success','Product Delivered Successfully');
    return res.redirect('/orders');
}



