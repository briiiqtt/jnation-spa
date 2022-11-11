const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const InsufficientArgumentError = require('../Errors/InsufficientArgumentError');
const LoginFailedError = require('../Errors/LoginFailedError');

router.use((req, res, next) => {
  next();
});

router.get('/get_all', async (req, res) => {
  try {
    const qr = await userModel.get_all();
    res.send(qr);
  } catch (e) {
    res.sendStatus(500);
  }
});
router.post('/add', async (req, res) => {
  try {
    const { id, pw } = req.body;
    const isValid = [id, pw].every((v) => v ?? false);
    if (!isValid) throw new InsufficientArgumentError();

    const qr = await userModel.is_this_userId_available(id);
    let bool = qr[0].count === 0;
    res.send(bool);
  } catch (e) {
    if (e instanceof InsufficientArgumentError) {
      res.sendStatus(400);
    } else {
      console.error(e);
      res.sendStatus(500);
    }
  }
});
router.get('/is_avail_id', async (req, res) => {
  try {
    const { id } = req.query;
    const isValid = [id].every((v) => v ?? false);
    if (!isValid) throw new InsufficientArgumentError();

    const qr = await userModel.get_uid_by_id(id);
    console.log(qr);
    let bool = qr.length === 0;
    res.send(bool);
  } catch (e) {
    if (e instanceof InsufficientArgumentError) {
      res.sendStatus(400);
    } else {
      console.error(e);
      res.sendStatus(500);
    }
  }
});
router.post('/login', async (req, res) => {
  try {
    const { id, pw } = req.body;
    console.log(id, pw);
    const isValid = [id, pw].every((v) => v ?? false);
    if (!isValid) throw new InsufficientArgumentError();

    const qr = await userModel.login(id, pw);
    if (qr.length === 1) {
      res.send(qr[0]);
    } else {
      throw new LoginFailedError();
    }
  } catch (e) {
    if (e instanceof InsufficientArgumentError) {
      res.sendStatus(400);
    } else if (e instanceof LoginFailedError) {
      res.sendStatus(404);
    } else {
      console.error(e);
      res.sendStatus(500);
    }
  }
});

module.exports = router;
