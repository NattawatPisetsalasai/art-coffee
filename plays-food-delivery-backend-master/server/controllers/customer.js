import { validationResult } from 'express-validator';
import boom from '@hapi/boom';
import pug from 'pug';
import path from 'path';
import customerService from '../services/customer';
import changeCase from '../../utils/changeCase';
import crypto from '../../utils/crypto';
import nodeMailer from '../../utils/nodeMailer';
import nodeMailerFunc from '../../utils/nodeMailer';

const customerController = {};

customerController.emailRegister = async (req, res, next) => {
  try {
    const {
      email
    } = req.query;

    const result = await nodeMailerFunc.sendEmailWithGmailOAuth2({
      from: process.env.GMAIL_ADDRESS,
      to: email,
      subject: 'Confirm email for register playlivery',
      html: pug.renderFile(path.resolve(__dirname, '..', 'views', 'email.pug'), { urlToken: 'https://google.com' })
    });

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

customerController.editProfile = async (req, res, next) => {
  try {
    const {
      username,
      firstname,
      lastname,
      phone
    } = req.body;

    let password = req.body.password;

    const customerId = req.user.id;

    if (password) {
      password = crypto.hashMessage(password);
    }

    const customer = await customerService.updateOne({
      customerId,
      username,
      password,
      firstname,
      lastname,
      phone
    });

    delete customer.password;
    delete customer.email;
    delete customer.facebookId;
    delete customer.googleId;
    delete customer.point;
    delete customer.defaultBillingAddr;
    delete customer.defaultShipping;
    delete customer.isDeleted;

    res.status(200).send(customer);
  } catch (err) {
    next(err);
  }
};

export default customerController;