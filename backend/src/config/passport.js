const passport = require('passport')
const passportJwt = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passportLocal = require('passport-local').Strategy
const User = require('../models/user-model')

passport.use(new passportJwt({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: 'VUTTR.WEBTOKEN',
}, async (payload, done) => {
  try {
    const user = User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));


passport.use(new passportLocal({
  usernameField: 'login',
}, async (login, password, done) => {
  try {
    const user = await User.findOne({ login });
    if (!user) {
      return done(null, false);
    }

    const passwordMatch = await user.checkPassword(password);
    if (!passwordMatch) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));
