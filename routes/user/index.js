const express = require('express');
const routes = express.Router()
const usercontroller = require('../../controller/usercontroller');
const passport = require('passport');
const passportlocal = require('../../controller/passport-local')

routes.post('/register',usercontroller.register)
routes.post('/login',passport.authenticate('local',{failureRedirect : '/user/login',successFlash : 'success'}),usercontroller.login)
routes.get('/logout',usercontroller.logout)

module.exports = routes;