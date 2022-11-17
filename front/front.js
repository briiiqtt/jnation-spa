const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
require('dotenv').config();

app.use(express.static(path.join(__dirname, `build`)));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/main', (req, res) => {
  console.log('/main');
  res.sendFile(`${__dirname}/build/index.html`);
});

app.listen((port = 80), async () => {
  console.log(`server started, port: ${port}`);
});
