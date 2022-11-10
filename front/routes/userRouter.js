const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const InsufficientArgumentError = require('../Errors/InsufficientArgumentError');

router.use((req, res, next) => {
  next();
});

router.use('/get_all', async (req, res) => {
  try {
    const qr = await userModel.get_all();
    res.send(qr);
  } catch (e) {
    res.status(500).send();
  }
});
router.use('/add', async (req, res) => {
  try {
    const { id, pw } = req.body;
    const isValid = [id, pw].every((v) => v ?? false);
    if (!isValid) throw new InsufficientArgumentError();

    const qr = await userModel.is_this_userId_available(id);
    let bool = qr[0].count === 0;
    res.send(bool);
  } catch (e) {
    if (e instanceof InsufficientArgumentError) {
      res.send(400).send();
    } else {
      console.error(e);
      res.status(500).send();
    }
  }
});
router.use('/is_avail_id', async (req, res) => {
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
      res.send(400).send();
    } else {
      console.error(e);
      res.status(500).send();
    }
  }
});
router.use('/login', async (req, res) => {
  try {
    const { id, pw } = req.body;
    const isValid = [id, pw].every((v) => v ?? false);
    if (!isValid) throw new InsufficientArgumentError();

    //const qr = await userModel
  } catch (e) {
    if (e instanceof InsufficientArgumentError) {
      res.send(400).send();
    } else {
      console.error(e);
      res.status(500).send();
    }
  }
});

module.exports = router;
