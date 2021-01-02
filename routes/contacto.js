var express = require('express');
const { isLoggedIn } = require('../authentication/validation');
var router = express.Router();
const pool = require('../database')

/* GET users listing. */
router.get('/',isLoggedIn, async(req,res)=>{
  console.log(req.user.id)
  const getContactos = await pool.query('SELECT * FROM contact WHERE user_id =?',[req.user.id]);
  res.render('contacto',{contactos:getContactos})
})

router.get('/add',isLoggedIn,(req,res)=>{
  res.render('formadd',{})
})

router.post('/add',async(req,res)=>{
  const {nombre,numero} = req.body;
  const newContacto ={
    nombre,
    numero,
    user_id:req.user.id
  }
  console.log(newContacto)

  await pool.query('INSERT INTO contact set ?',[newContacto]);
  req.flash('exito',"Se ha guardado exitosamente");
  res.redirect('/contacto');
})

router.get('/delete/:id',isLoggedIn,async(req,res)=>{
  const {id} = req.params;
  await pool.query('DELETE FROM contact WHERE id =?',[id])
  res.redirect('/contacto')
})

router.get('/edit/:id', isLoggedIn,async(req,res)=>{
  const {id} = req.params;
  const editContact = await pool.query('SELECT * FROM contact WHERE id = ?',[id]);
  console.log(editContact)
  res.render('edit',{nombre:editContact[0].nombre,numero:editContact[0].numero, id:editContact[0].id})
})

router.post('/edit/:id',async(req,res)=>{
  const {id} = req.params
  const {nombre,numero} = req.body;
  const editContact = {
    nombre,
    numero,
  }
  
  await pool.query('UPDATE contact SET ? WHERE id = ?',[editContact,id])
  res.redirect('/contacto')
})


module.exports = router;
