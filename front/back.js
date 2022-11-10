const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const userRouter = require('./routes/userRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen((port = 50080), async () => {
  console.log(`server started, port: ${port}`);
});

app.use('/user', userRouter);
