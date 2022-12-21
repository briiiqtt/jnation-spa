const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const InsufficientArgumentError = require('../Errors/InsufficientArgumentError');
const LoginFailedError = require('../Errors/LoginFailedError');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

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

router.get('/login/google/callback', (req, res, next) => {
  passport.authenticate(
    'google',
    {
      successRedirect: '/',
      failureRedirect: '/fail',
      successFlash: 'good',
      failureFlash: true,
    },
    (err, user, info) => {
      console.log(99999999, err, user, info);
      if (err) {
        console.error(err);
        next(err);
      }
      // if (info) {
      //   return res.status(401).send(info.reason);
      // }
      // res.redirect('http://localhost');
      return req.login(user, async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        } else {
          // res.json(user);
          res.redirect('http://localhost');
        }
      });
    }
  )(req, res, next);
});

router.post('/login', function (req, res, next) {
  // console.log('login', req.body);
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
// router.post('/login', async (req, res) => {
//   try {
//     const { id, pw } = req.body;
//     const isSufficient = [id, pw].every((v) => v ?? false);
//     if (!isSufficient) throw new InsufficientArgumentError();

//     const queryResult = await userModel.login(id, pw);
//     if (queryResult.length === 1) {
//       res.send(queryResult[0]);
//     } else {
//       throw new LoginFailedError();
//     }
//   } catch (e) {
//     if (e instanceof InsufficientArgumentError) {
//       res.sendStatus(400);
//     } else if (e instanceof LoginFailedError) {
//       res.sendStatus(401);
//     } else {
//       console.error(e);
//       res.sendStatus(500);
//     }
//   }
// });
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
