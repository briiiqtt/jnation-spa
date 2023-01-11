const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const InsufficientArgumentError = require('../Errors/InsufficientArgumentError');
const LoginFailedError = require('../Errors/LoginFailedError');

const passport = require('passport');

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

    const queryResult = await userModel.addUser(id, pw, nickname);
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

router.get('/is_id_exist', async (req, res) => {
  try {
    const { id } = req.query;
    const isSufficient = [id].every((v) => v ?? false);
    if (!isSufficient) throw new InsufficientArgumentError();

    const queryResult = await userModel.getUserCountById(id);
    const { count } = queryResult[0];

    if (count === 0) {
      res.send({ isExist: false });
    } else if (count === 1) {
      res.send({ isExist: true });
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

router.get('/is_nickname_exist', async (req, res) => {
  try {
    const { nickname } = req.query;
    const isSufficient = [nickname].every((v) => v ?? false);
    if (!isSufficient) throw new InsufficientArgumentError();

    const queryResult = await userModel.getUserCountByNickname(nickname);
    const { count } = queryResult[0];

    if (count === 0) {
      res.send({ isExist: false });
    } else if (count === 1) {
      res.send({ isExist: true });
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

router.get('/login/google', function (req, res, next) {
  passport.authenticate('google', { scope: ['email', 'profile'] })(
    req,
    res,
    next
  );
});

router.get(
  '/login/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`,
  }),
  async (req, res, next) => {
    console.log(req.user);
    return res.redirect(
      `${process.env.FRONTEND_PROTOCOL}://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`
    );
  }
);

router.post('/login', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.json(user);
    });
  })(req, res, next);
});

router.get('/logout', function (req, res, next) {
  req.logout((err) => {
    req.session.destroy();
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
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

router.get('/get-session', (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(400).send(null);
  }
});

module.exports = router;
