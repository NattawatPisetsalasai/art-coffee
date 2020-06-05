import path from 'path';
import productModel from '../models/product';
import categoryModel from '../models/category';
import changeCase from '../../utils/changeCase';
import gcs from '../../utils/gcs/gcs';

const productService = {};

productService.findPagination = async ({
  productId,
  nameTh,
  nameEn,
  price,
  updateTime,
  isEnabled,
  isDeleted,
  isRecommended,
  page,
  pageSize,
  orderBy,
  direction
}) => {
  try {
    let arrProduct = await productModel.findPagination({
      productId,
      nameTh,
      nameEn,
      price,
      updateTime,
      isEnabled,
      isDeleted,
      isRecommended,
      page,
      pageSize,
      orderBy,
      direction
    });

    arrProduct = changeCase.objInArrCamel(arrProduct);
    for (const [i, product] of arrProduct.entries()) {
      arrProduct[i].price = parseFloat(product.price);
    }
    return arrProduct;
  } catch (err) {
    throw err;
  }
};

productService.fetchCategory = async () => {
  try {
    let arrCategory = await categoryModel.fetch();
    arrCategory = changeCase.objInArrCamel(arrCategory);
    return arrCategory;
  } catch (err) {
    throw err;
  }
};

productService.findOne = async ({
  productId,
  nameTh,
  nameEn,
  price,
  updateTime,
  isEnabled,
  isDeleted,
  isRecommended
}) => {
  try {
    let product = await productModel.findOne({
      productId,
      nameTh,
      nameEn,
      price,
      updateTime,
      isEnabled,
      isDeleted,
      isRecommended
    });
    product = changeCase.objCamel(product[0]);
    return product;
  } catch (err) {
    throw err;
  }
};

productService.findPaginationProductInCategory = async ({
  categoryId,
  categoryNameTh,
  categoryNameEn,
  orderBy,
  direction,
  pageSize,
  page
}) => {
  try {
    let arrProductCategory = await productModel.findPaginationProductInCategory({
      categoryId,
      categoryNameTh,
      categoryNameEn,
      orderBy,
      direction,
      pageSize,
      page
    });
    arrProductCategory = changeCase.objInArrCamel(arrProductCategory);
    for (const [i, productCategory] of arrProductCategory.entries()) {
      arrProductCategory[i].productPrice = parseFloat(productCategory.productPrice);
    }
    return arrProductCategory;
  } catch (err) {
    throw err;
  }
};

productService.insertAmountProductInCategory = async (arrCategory) => {
  try {
    for (const [i, category] of arrCategory.entries()) {
      let totalProductInCategory = await productModel.getAmountProductInCategory({
        categoryId: category.categoryId
      });
      totalProductInCategory = changeCase.objInArrCamel(totalProductInCategory);
      arrCategory[i].totalProduct = parseInt(totalProductInCategory[0].productTotal, 10);
    }

    return arrCategory;
  } catch (err) {
    throw err;
  }
};

productService.getAmount = async ({
  productId,
  nameTh,
  nameEn,
  price,
  updateTime,
  isEnabled = true,
  isDeleted = false,
  isRecommended
}) => {
  try {
    let totalProduct = await productModel.getAmount({
      productId,
      nameTh,
      nameEn,
      price,
      updateTime,
      isEnabled,
      isDeleted,
      isRecommended
    });
    totalProduct = changeCase.objInArrCamel(totalProduct);
    return totalProduct[0].productTotal;
  } catch (err) {
    throw err;
  }
};

productService.insertImageLink = async (arrProduct) => {
  try {
    for (const [i, product] of arrProduct.entries()) {
      const fileExists = await gcs.isExists({
        file: `product_${product.productId}.png`,
        arrFolderName: ['products']
      });

      if (fileExists) {
        const imageLink = await gcs.getSignedUrl({
          file: `product_${product.productId}.png`,
          arrFolderName: ['products'],
          hours: 2
        });
        arrProduct[i].image = imageLink[0];
      }
    }
    return arrProduct;
  } catch (err) {
    throw err;
  }
};

productService.getImageLinkOne = async (productId) => {
  try {
    const fileExists = await gcs.isExists({
      file: `product_${productId}.png`,
      arrFolderName: ['products']
    });

    if (fileExists) {
      const imageLink = await gcs.getSignedUrl({
        file: `product_${productId}.png`,
        arrFolderName: ['products'],
        hours: 2
      });
      return imageLink[0];
    }

    return undefined;
  } catch (err) {
    throw err;
  }
};

export default productService;