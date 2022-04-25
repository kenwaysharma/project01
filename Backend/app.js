const express = require('express')
const app = express()
const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')
var bodyParser = require('body-parser')
var session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser')


//Passport config
require('./config/passport')(passport);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser("secret"));
app.use(session({
  cookie:{httpOnly:true,
    maxAge: 1*60*60*1000},
    resave: false,
    saveUninitialized: true,
    secret: 'secret' 
  }));
// parse application/json
app.use(bodyParser.json())

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => res.send('Hello World!'))
app.use('/users', userRouter);
app.use('/post', postRouter);


module.exports = app;