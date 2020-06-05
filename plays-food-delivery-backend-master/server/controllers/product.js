import { validationResult } from 'express-validator';
import boom from '@hapi/boom';
import productService from '../services/product';
import optionService from '../services/option';
import changeCase from '../../utils/changeCase';

const productController = {};

productController.getRecommendProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw boom.badRequest('invalid input', { errors: errors.array() });
    }

    const { page, pageSize } = req.query;
    let arrProduct = await productService.findPagination({
      page: page - 1,
      pageSize,
      orderBy: 'sequence',
      isRecommended: true
    });

    arrProduct = changeCase.deleteFieldObjInArr([
      'updatedTime',
      'isEnabled',
      'isDeleted',
      'isRecommended',
      'sequence'],
    arrProduct);

    arrProduct = await productService.insertImageLink(arrProduct);
    const total = await productService.getAmount({
      isRecommended: true
    });

    const result = {
      total: parseInt(total, 10),
      products: arrProduct
    };

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

productController.getAllCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw boom.badRequest('invalid input', { errors: errors.array() });
    }
    const { pageSize } = req.query;
    let arrCategory = await productService.fetchCategory();

    let arrProductCategory = await productService.findPaginationProductInCategory({
      categoryId: parseInt(arrCategory[0].categoryId, 10),
      page: 0,
      pageSize,
      orderBy: 'sequence'
    });

    arrCategory = await productService.insertAmountProductInCategory(arrCategory);

    arrProductCategory = await productService.insertImageLink(arrProductCategory);

    const result = {
      category: arrCategory,
      productFirstPage: arrProductCategory
    };

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

productController.getProductByCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw boom.badRequest('invalid input', { errors: errors.array() });
    }
    const { page, pageSize, categoryId } = req.query;
    let arrProductCategory = await productService.findPaginationProductInCategory({
      categoryId,
      page: page - 1,
      pageSize,
      orderBy: 'sequence'
    });

    arrProductCategory = await productService.insertImageLink(arrProductCategory);

    res.status(200).send(arrProductCategory);
  } catch (err) {
    next(err);
  }
};

productController.getProductDetail = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw boom.badRequest('invalid input', { errors: errors.array() });
    }

    const result = {};

    const { productId } = req.query;

    const arrOption = await optionService.findOptionByProduct({
      productId
    });

    if (arrOption.length) {
      result.productId = arrOption[0].productId;
      result.productNameTh = arrOption[0].productNameTh;
      result.productDescriptionTh = arrOption[0].productDescriptionTh;
      result.productNameEn = arrOption[0].productNameEn;
      result.productDescriptionEn = arrOption[0].productDescriptionEn;
      result.productPrice = arrOption[0].productPrice;
      result.image = await productService.getImageLinkOne(arrOption[0].productId);
      result.options = await optionService.getChoiceInOption(arrOption);
    } else {
      // Case product have no any option
      const product = await productService.findOne({
        productId
      });

      if (Object.keys(product).length === 0 && product.constructor === Object) {
        throw boom.badRequest(`Don't found productId : ${productId}`);
      }

      result.productId = product.productId;
      result.productNameTh = product.nameTh;
      result.productDescriptionTh = product.descriptionTh;
      result.productNameEn = product.nameEn;
      result.productDescriptionEn = product.descriptionEn;
      result.productPrice = product.price;
      result.image = await productService.getImageLinkOne(product.productId);
    }
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export default productController;
