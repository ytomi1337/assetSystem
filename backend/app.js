var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
require('dotenv').config();

const { Sequelize } = require('sequelize');
const basicAuth = require('express-basic-auth')

global.sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
);

async function testDatabaseConnection() {
  try {
    await global.sequelize.authenticate();
    console.log('Connection to PostgreSQL established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testDatabaseConnection();

var assetsRouter = require('./routes/assets.js');
var categoriesRouter = require('./routes/category.js');
var localizationsRouter = require('./routes/localizations.js');
var statusRouter = require('./routes/status.js')
var usersRouter = require('./routes/users.js')
var app = express();

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, "*"); // Zezwala na dostęp np. z Postmana
    callback(null, origin);
  },
  credentials: true, // 👈 Obsługa ciasteczek / nagłówków autoryzacji
  methods: "GET,POST,PATCH,PUT,DELETE,OPTIONS", // 👈 Zezwalamy na WSZYSTKIE metody
  allowedHeaders: "Content-Type,Authorization", // 👈 Pozwalamy na nagłówki JSON i autoryzacji
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(basicAuth({
  users: { admin: 'test123' },
  challenge: true 
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', assetsRouter);
app.use('/', categoriesRouter);
app.use('/', localizationsRouter);
app.use('/', statusRouter);
app.use('/', usersRouter);

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
