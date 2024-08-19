const session = require('express-session');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { ensureAuthenticated, ensureAdmin } = require('./middleware/ensureAuthenticated');
const userRoutes = require('./routes/users')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// (1A) import mongoose : db connect & access
var mongoose = require('mongoose')
// (1B) config mongoose
var db = "mongodb+srv://minhmhdgch200530:Minhmauday2468@my-cluster.gdxjcn7.mongodb.net/toystore"  
mongoose.connect(db)
  .then(() => console.log('connect to db succeed !'))
  .catch(err => console.error('connect to db failed ! ' + err))

  app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
  }));

// (2A) import body-parser : get user's input (url : req.params, form : req.body)
var bodyParser = require('body-parser')
// (2B) config body-parser
app.use(bodyParser.urlencoded({ extended : true }))

// (3) declare router
var toyRouter = require('./routes/toy')
app.use('/toy',ensureAdmin, toyRouter)

app.use('/login',userRoutes);

var categoryRouter = require('./routes/category')
app.use('/category', ensureAdmin, categoryRouter)

//app.use('/resgister',usersRouter)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

app.listen(process.env.PORT || 3001)
module.exports = app;
