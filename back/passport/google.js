const passport = require('passport');
const userModel = require('../models/userModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLEOAUTH_ID,
        clientSecret: process.env.GOOGLEOAUTH_SECRET,
        callbackURL: `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/user/login/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userModel.getUser(profile.id);
          if (user) {
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
