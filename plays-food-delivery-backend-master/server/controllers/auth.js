import { validationResult } from 'express-validator';
import { config } from 'dotenv';
import boom from '@hapi/boom';
import customerService from '../services/customer';
import authService from '../services/auth';
import crypto from '../../utils/crypto';

config();

const authController = {};

authController.generateTokenFromGoogle = async (req, res, next) => {
  try {
    const googleInfo = {
      id: req.user.id,
      username: req.user.displayName,
      firstname: req.user.name.givenName,
      lastname: req.user.name.familyName,
      email: req.user.emails[0].value
    };

    console.log('req user : ', req.user);

    let customer;
    let token;

    if (await customerService.isExists({
      googleId: googleInfo.id
    })) {
      customer = await customerService.findOne({
        googleId: googleInfo.id
      });
      token = await authService.genToken({
        customerId: customer.customerId
      });
    } else {
      customer = await customerService.insertOne({
        googleId: googleInfo.id,
        username: googleInfo.username,
        firstname: googleInfo.firstname,
        lastname: googleInfo.lastname,
        email: googleInfo.email
      });
      token = await authService.genToken({
        customerId: customer.customerId
      });
    }

    res.redirect(`${process.env.FRONTEND_HOST || 'http://localhost:3000'}${process.env.FRONTEND_BASE_PATH || ''}/login/${token.accessToken}/${token.refreshToken}`);
    // res.status(200).send(token);
  } catch (err) {
    next(err);
  }
};

authController.generateTokenFromFacebook = async (req, res, next) => {
  try {
    const facebookInfo = {
      id: req.user.id,
      username: req.user.username,
      firstname: req.user.name.givenName,
      lastname: req.user.name.familyName,
      email: req.user.emails && req.user.emails.length ? req.user.emails[0].value : undefined
    };

    console.log('req user : ', req.user);

    let customer;
    let token;

    customer = await customerService.findOne({
      facebookId: facebookInfo.id
    });

    if (Object.keys(customer).length !== 0 && customer.constructor === Object) {
      token = await authService.genToken({
        customerId: customer.customerId
      });
    } else {
      customer = await customerService.findOne({
        email: facebookInfo.email
      });

      if (Object.keys(customer).length !== 0 && customer.constructor === Object) {
        customer = await customerService.updateOne({
          customerId: customer.customerId,
          facebookId: facebookInfo.id
        });
      } else {
        customer = await customerService.insertOne({
          facebookId: facebookInfo.id,
          username: facebookInfo.username,
          firstname: facebookInfo.firstname,
          lastname: facebookInfo.lastname,
          email: facebookInfo.email
        });
      }

      token = await authService.genToken({
        customerId: customer.customerId
      });
    }

    res.redirect(`${process.env.FRONTEND_HOST || 'http://localhost:3000'}${process.env.FRONTEND_BASE_PATH || ''}/login/${token.accessToken}/${token.refreshToken}`);
    // res.status(200).send(token);
  } catch (err) {
    next(err);
  }
};

authController.emailSignIn = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw boom.badRequest('invalid input', { errors: errors.array() });
    }

    const { email, password } = req.body;

    let customer;
    let token;

    if (await customerService.isExists({
      email
    })) {
      customer = await customerService.findOne({
        email
      });

      if (customer.password !== crypto.hashMessage(password)) {
        boom.badRequest("Password don't matching");
      }

      token = await authService.genToken({
        customerId: customer.customerId
      });
      res.status(200).send(token);
    } else {
      throw boom.badRequest("Don't have email in system");
    }
  } catch (err) {
    next(err);
  }
};

authController.getAccessByRefreshToken = async (req, res, next) => {
  try {
    const role = req.user.role;
    let token = '';
    if (req.user.type === 'refresh') {
      if (role === 'customer') {
        token = await authService.genAccessToken({
          customerId: req.user.id
        });
      } else if (role === 'restaurant') {
        console.log('restaurant');
      } else {
        throw boom.badImplementation("Can't defind role of user");
      }
      res.status(200).send(token);
    } else {
      throw boom.unauthorized("Token type isn't refresh");
    }
  } catch (err) {
    throw err;
  }
};

export default authController;