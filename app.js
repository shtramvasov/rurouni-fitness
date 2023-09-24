const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const router = require('./routes/v1/index');
const authRouter = require('./routes/v1/auth/auth');
const pg = require('pg');
const passport = require('./middlewares/passport-strategy');
const requireAuth = require('./middlewares/auth');
require('dotenv').config();

const API_PORT = process.env.API_PORT;
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('short'));
pg.types.setTypeParser(1082, value => value)

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 5 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());


// router
app.use('/api/v1/auth', authRouter);
app.use('/api/v1', requireAuth, router);

app.listen(API_PORT, () => {
	console.log(`Sever is listering on port: ${API_PORT}`);
});
