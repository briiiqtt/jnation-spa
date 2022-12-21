const passport = require('passport');
const userModel = require('../models/userModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLEOAUTH_ID,
        clientSecret: process.env.GOOGLEOAUTH_SECRET,
        callbackURL: 'http://127.0.0.1:50080/user/login/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userModel.getUser(profile.id);
          if (user) {
            console.log(124124);
            return done(null, user);
          } else {
            const res = await userModel.addUser(
              profile.id,
              'google',
              profile.displayName
            );
            if (res.affectedRows === 1) {
              const user = await userModel.getUser(profile.id);
              return done(null, user);
            } else {
              return done(null, false, { reason: 'asdfasdf' });
            }
          }
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
