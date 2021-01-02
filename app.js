const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash')
const {database} = require('./keys');


//Importando las rutas
const indexRouter = require('./routes/index');
const contactRouter = require('./routes/contacto');
const authRouter = require('./routes/auth');
const MySQLStore = require('express-mysql-session');

require('./authentication/passport');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secretooss'));
app.use(session({
  secret:'backendnode.js',
  resave:true,
  saveUninitialized:true,
  store: new MySQLStore(database)
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use((req,res,next)=>{
  app.locals.exito = req.flash('exito');
  app.locals.error = req.flash('error');
  app.locals.user = req.user;
  next();
})


// Routes
app.use('/', indexRouter);
app.use('/contacto' , contactRouter);
app.use('/login', authRouter);
app.use('/logout',(req,res)=>{
  req.logOut();
  res.redirect('/');
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
