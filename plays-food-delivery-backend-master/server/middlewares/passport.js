import passport from 'passport';
import { config } from 'dotenv';
import boom from '@hapi/boom';
import passportJWT from 'passport-jwt';
import changeCase from '../../utils/changeCase';

import customerModel from '../models/customer';

config();

const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use('google', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BASE_PATH || ''}/api/auth/google/callback`,
  proxy: true
},
((accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
})));

passport.use('facebook', new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: `${process.env.BASE_PATH || ''}/api/auth/facebook/callback`,
  proxy: true,
  profileFields: ['email', 'displayName', 'name', 'id']
},
((accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
})));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

passport.use('jwt', new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
},
(async (payload, done) => {
  // find the user in db if needed
  const id = payload.id;
  const role = payload.role;
  if (payload.type === 'access') {
    if (role === 'customer') {
      let customer = await customerModel.findOne({
        customerId: id
      });
      if (!customer.length) {
        return done(boom.unauthorized("Can't find customer"), null);
      }
      customer = changeCase.objCamel(customer[0]);
      return done(null, payload);
    } if (role === 'restaurant') {
      console.log('wait for restaurant');
    }
  }
  if (payload.type === 'refresh') {
    if (role === 'customer') {
      let customer = await customerModel.findOne({
        customerId: id
      });
      if (!customer.length) {
        return done(boom.unauthorized("Can't find customer"), null);
      }
      customer = changeCase.objCamel(customer[0]);
      return done(null, payload);
    } if (role === 'restaurant') {
      console.log('wait for restaurant');
    }
  }
  if (payload.type === 'resetToken') {
    // wait for reset token
  }
})));

export default passport;