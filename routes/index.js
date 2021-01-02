const express = require('express');
const { render } = require('../app');
const router = express.Router();
const pool = require('../database');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {success:req.flash('exito') });
});

router.get('/profile',(req,res)=>{
  const {nombre} = req.user;
  res.render('profile',{name:nombre});
})  

module.exports = router;
