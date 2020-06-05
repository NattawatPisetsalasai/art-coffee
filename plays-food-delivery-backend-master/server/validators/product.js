import { check } from 'express-validator';

const productValidator = {};

productValidator.getRecommendProduct = () => {
  return [
    check('page')
      .isInt({ min: 1 })
      .withMessage('page should be int and more than 0'),
    check('pageSize')
      .isInt({ min: 1 })
      .withMessage('pageSize should be int and more than 0')
  ];
};

productValidator.getAllCategory = () => {
  return [
    check('pageSize')
      .isInt({ min: 1 })
      .withMessage('pageSize should be int and more than 0')
  ];
};

productValidator.getProductByCategory = () => {
  return [
    check('categoryId')
      .isInt({ min: 1 })
      .withMessage('categoryId should be int and more than 0'),
    check('page')
      .isInt({ min: 1 })
      .withMessage('page should be int and more than 0'),
    check('pageSize')
      .isInt({ min: 1 })
      .withMessage('pageSize should be int and more than 0')
  ];
};

productValidator.getProductDetail = () => {
  return [
    check('productId')
      .isInt({ min: 1 })
      .withMessage('productId should be int and more than 0'),
  ];
};

export default productValidator;