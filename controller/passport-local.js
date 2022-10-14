const passport = require('passport')
const passportlocal = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

passport.use( new passportlocal ({
    usernameField : 'email'
},
function(email,password,done){

        User.findOne({email}, async (error,user) => {
            if(error){
                done(error); 
            }
            if(!user){
                done(null,false)
            }
            const pass = await bcrypt.compare(password , user.password);

            if(!pass){
                done(null,false)
            }

            done(null,user)
        })
    }
))


passport.serializeUser(function(user,done){
    done(null,user.id)
})

passport.deserializeUser(function(id,done){
    User.findById(id,(error,user) => {
        if(error){
            done(error)
        }
        return done(null,user)
    })
})

passport.checkAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        next()
    }
    else {
       return res.redirect('/user/login');
    }
}

passport.setAuthenticatedUser = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
}


passport.checkAuthenticationadmin = (req,res,next) => {
    if(req.isAuthenticated() && req.user.roll == 'admin') {
        next()
    }
    else {
       return res.redirect('/user/login');
    }
}