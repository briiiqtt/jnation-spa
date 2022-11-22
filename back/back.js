const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

const userRouter = require('./routes/userRouter');
const menuRouter = require('./routes/menuRouter');
const boardRouter = require('./routes/boardRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen((port = 50080), async () => {
  console.log(`server started, port: ${port}`);
});

app.use(
  cors({
    origin: true,
  })
);

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

app.use((req, res, next) => {
  console.log(req.path);
  // sleep(1000);
  next();
});

app.use('/user', userRouter);
app.use('/menu', menuRouter);
app.use('/board', boardRouter);
