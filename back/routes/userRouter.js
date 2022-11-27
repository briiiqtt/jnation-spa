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
    const queryResult = await userModel.get_all();
    res.send(queryResult);
  } catch (e) {
    res.sendStatus(500);
  }
});
router.post('/add', async (req, res) => {
  try {
    const { id, pw, nickname } = req.body;
    const isSufficient = [id, pw, nickname].every((v) => v ?? false);
    if (!isSufficient) throw new InsufficientArgumentError();

    const queryResult = await userModel.add_user(id, pw, nickname);
    res.send({ affectedRows: queryResult.affectedRows, id, nickname });
  } catch (e) {
    if (e instanceof InsufficientArgumentError) {
      res.sendStatus(400);
    } else {
      console.error(e);
      res.sendStatus(500);
    }
  }
});
router.get('/is_id_available', async (req, res) => {
  try {
    const { id } = req.query;
    const isSufficient = [id].every((v) => v ?? false);
    if (!isSufficient) throw new InsufficientArgumentError();

    const queryResult = await userModel.getUserCountById(id);
    const { count } = queryResult[0];

    if (count === 0) {
      res.send({ isAvailable: true });
    } else if (count === 1) {
      res.send({ isAvailable: false });
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e instanceof InsufficientArgumentError) {
      res.sendStatus(400);
    } else {
      console.error(e);
      res.sendStatus(500);
    }
  }
});
router.get('/is_nickname_available', async (req, res) => {
  try {
    const { nickname } = req.query;
    const isSufficient = [nickname].every((v) => v ?? false);
    if (!isSufficient) throw new InsufficientArgumentError();

    const queryResult = await userModel.getUserCountByNickname(nickname);
    const { count } = queryResult[0];

    if (count === 0) {
      res.send({ isAvailable: true });
    } else if (count === 1) {
      res.send({ isAvailable: false });
    } else {
      throw new Error();
    }
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
    const isSufficient = [id, pw].every((v) => v ?? false);
    if (!isSufficient) throw new InsufficientArgumentError();

    const queryResult = await userModel.login(id, pw);
    if (queryResult.length === 1) {
      res.send(queryResult[0]);
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
router.get('/total', async (req, res) => {
  try {
    const queryResult = await userModel.getUserTotal();
    res.send(queryResult[0]);
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
