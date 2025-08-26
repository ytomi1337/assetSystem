require('dotenv').config();
const express = require('express');

const session = require('express-session');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const corsOptions = require('./config/corsOptions.js')
const sequelize = require('./config/db.js');
const createError = require('http-errors');

const assetsRouter = require('./routes/assets.js');
const categoriesRouter = require('./routes/category.js');
const localizationsRouter = require('./routes/localizations.js');
const statusRouter = require('./routes/status.js')
const usersRouter = require('./routes/users.js')
const phonesRouter = require('./routes/phones.js')
const remindersRouter = require('./routes/reminders.js')
const activityLog = require('./routes/activitylog.js')

const app = express();

//Authorization
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
    })
)

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACKURL
    },
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile)
        }
    )
);

app.get("/auth/google", passport.authenticate('google', {scope: ["profile", "email"] }) 
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null,user));

app.get("/auth", (req, res) => {
    res.send("<a href='/auth/google'>Login with Google</a>")
});

app.get("/auth/google/callback", passport.authenticate('google', {failureRedirect: "/"}), (req, res) =>{
    res.redirect('/assets')
})

app.get("/logout", (req, res) => {
    req.logOut(() =>{
        res.redirect("/");
    });
})
//Middleware
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routing
app.use('/', assetsRouter);
app.use('/', categoriesRouter);
app.use('/', localizationsRouter);
app.use('/', statusRouter);
app.use('/', usersRouter);
app.use('/', phonesRouter);
app.use('/', remindersRouter);
app.use('/', activityLog);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
