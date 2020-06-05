import { check } from 'express-validator';

const authValidator = {};

authValidator.signIn = () => {
  return [
    check('email')
      .isEmail(),
    check('password')
      .isString()
      .withMessage('password should be string')
  ];
};

export default authValidator;