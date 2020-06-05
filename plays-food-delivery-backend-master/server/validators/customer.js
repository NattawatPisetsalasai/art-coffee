import { check } from 'express-validator';

const customerValidator = {};

customerValidator.editProfile = () => {
  return [
    check('username')
      .isString()
      .withMessage('username should be string')
      .optional(),
    check('password')
      .isString()
      .withMessage('password should be string')
      .optional(),
    check('firstname')
      .isString()
      .withMessage('firstname should be string')
      .optional(),
    check('lastname')
      .isString()
      .withMessage('lastname should be string')
      .optional(),
    check('phone')
      .isString()
      .withMessage('firstname should be string')
      .isMobilePhone()
  ];
};

export default customerValidator;