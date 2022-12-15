const passport = require('passport');

const { Strategy: LocalStrategy } = require('passport-local');
const userModel = require('../models/userModel');
// const bcrypt = require('bcrypt');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'id', passwordField: 'pw' },
      async (id, pw, done) => {
        try {
          const qr = await userModel.getUser(id);
          const user = qr[0];
          if (!user) done(null, false, { reason: '존재하지 않는 이메일' });
          const result = pw === user.pw; //await bcrypt.compare(password, user.password);
          delete user.pw;
          // console.log('query', result);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: '비밀번호 틀림' });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
