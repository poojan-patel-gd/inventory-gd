const express = require('express');
const routes = express.Router()
const usercontroller = require('../../controller/usercontroller');
const passport = require('passport');
const passportlocal = require('../../controller/passport-local');
const admincontroller = require('../../controller/admincontroller');
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination : function (req,file,callback) {
        callback(null, path.join(__dirname + '/../../public/images' ));
    },
    filename : function(req,file,callback) {
        callback(null,Date.now() + file.originalname );
    }
});

const upload = multer({storage : storage}).single('image');

routes.post('/addproduct',upload,admincontroller.addproduct)
routes.get('/editproduct/:id',admincontroller.editproduct)
routes.get('/removeproduct/:id',admincontroller.removeproduct)
routes.post('/updateproduct/:id',admincontroller.UpdateProduct);
routes.post('/buyproduct/:id',passport.checkAuthentication,admincontroller.Buyproduct);
routes.get('/delivered/:id',admincontroller.delivered);
routes.post('/caregory',admincontroller.createCategory);
routes.get('/addnewproduct',admincontroller.AddProductPage)
routes.get('/addcategory',admincontroller.categorypage)

module.exports = routes;