const passport = require('passport');
const userModel = require('../models/userModel');
const local = require('./local');

module.exports = () => {
  passport.serializeUser((user, done) => {
    // console.log('serializeUser()', user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.getUser(id);
      // console.log('deserializeUser()', user);
      done(null, user[0]);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
