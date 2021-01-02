var express = require('express');
var router = express.Router();
const pool = require('../database');
const passport = require('passport');
const { isNotLoggedIn } = require('../authentication/validation');

router.get('/',isNotLoggedIn,(req,res)=>{
    res.render('login',{})
})

router.post('/',(req,res,next)=>{
    passport.authenticate('local.signin',{
        successRedirect:'/',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next);
})

router.get('/signup',isNotLoggedIn,(req,res)=>{
    res.render('signup',{});
})

router.post('/signup',passport.authenticate('local.signup',{
    successRedirect:'/',
    failureRedirect:'/login/signup',
    failureFlash:true
}))



module.exports = router;