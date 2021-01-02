const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const pool = require('../database');
const encrypt = require('./encrypt');

passport.use('local.signin',new localStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback:true
},async(req,username,password,done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE username =?',[username]);
    if(rows.length > 0){
        const user = rows[0];
        const validPassword = await encrypt.matchPassword(password,user.password)
        if(validPassword){
            done(null,user)
        }else{
            done(null,false,req.flash('error','Contrasena Incorrecta'));
        }
    }else{
        return done(null,false,req.flash('error','El usuario no existe'))
    }
}
))

passport.use('local.signup',new localStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback:true,
},async(req,username,password,done)=>{
    const {nombre} = req.body;
    const newUser ={
        username,
        password,
        nombre,
    }
    newUser.password = await encrypt.encryptPassword(password);
    const row = await pool.query('SELECT * FROM users WHERE username = ?',[username])
    if(row.length > 0  ){
        return done(null,false,req.flash('error','El usuario ya existe'))
    }
    const result = await pool.query('INSERT INTO users set ?',[newUser]);
    newUser.id = result.insertId;
    return done(null,newUser);
}
));

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE id =?',[id]);
    done(null,rows[0]);
})