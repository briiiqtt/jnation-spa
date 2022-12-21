const passport = require('passport');
const userModel = require('../models/userModel');
const google = require('./google');
const local = require('./local');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('serializeUser()', user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.getUser(id);
      console.log('deserializeUser()', user);
      done(null, user);
    } catch (error) {
      console.error('deserialize error', error);
      done(error);
    }
  });

  local();
  google();
};
