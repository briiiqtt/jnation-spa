const express = require('express');
const router = express.Router();

const { isValid } = require('shortid');
const shortid = require('shortid');
require('dotenv').config();

const userModel = require('../models/user');

router.use((req, res, next) => {
  next();
});
router.use('/get_all', async (req, res) => {
  const qr = await userModel.get_all();
  res.send(qr);
});
router.use('/add', async (req, res) => {
  const qr = await userModel.get_all();
  res.send(qr);
});
router.use('/isAvailableId', async (req, res) => {
  const { id } = req.query;
  const isValid = [id].every((v) => v ?? false);
  if (isValid) {
    try {
      const qr = await userModel.is_this_userId_available(id);
      let bool = qr[0].count === 0;
      res.send(bool);
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  } else {
    res.send(false);
  }
});

module.exports = router;
