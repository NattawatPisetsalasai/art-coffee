import { check } from 'express-validator';

const orderValidator = {};

orderValidator.signIn = () => {
  return [
    check('email')
      .isEmail(),
    check('password')
      .isString()
      .withMessage('password should be string')
  ];
};

orderValidator.getOrderHistory = () => {
  return [
    check('page')
      .isInt({ min: 1 })
      .withMessage('page should be int and more than 0')
  ];
};

export default orderValidator;