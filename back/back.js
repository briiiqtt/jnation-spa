const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

const passport = require('passport');
const passportConfig = require('./passport');
passportConfig();

const session = require('express-session');

const userRouter = require('./routes/userRouter');
const menuRouter = require('./routes/menuRouter');
const boardRouter = require('./routes/boardRouter');
const cookieParser = require('cookie-parser');

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_DATABASE,
});
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET,
    store: sessionStore,
  })
);
app.use(passport.initialize());
app.use(passport.session());

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log(req.user?.id, req.path, req.session);
  // sleep(1000);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen((port = 50080), async () => {
  console.log(`server started, port: ${port}`);
});

app.use('/user', userRouter);
app.use('/menu', menuRouter);
app.use('/board', boardRouter);
