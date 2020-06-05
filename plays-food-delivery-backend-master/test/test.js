import dateFormat from 'dateformat';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import pug from 'pug';
import path from 'path';
import nodeMailer from '../utils/nodeMailer';

config();

const result = nodeMailer.sendEmailWithGmailOAuth2({
  from: process.env.GMAIL_ADDRESS,
  to: 'vathunyoo@playtorium.co.th',
  subject: 'Confirm email for register playlivery',
  html: pug.renderFile(path.resolve(__dirname, '..', 'server', 'views', 'email.pug'), { urlToken: 'https://google.com' })
});

console.log('result : ', result);
