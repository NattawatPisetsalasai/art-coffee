import changeCase from '../../utils/changeCase';
import db from '../db';

const productModel = {};

productModel.fetchProductInCategory = async () => {
  try {
    return await db.query(
      'SELECT'
        + ' categories.name_th as catetory_name_th,'
        + ' categories.description_th as category_description_th,'
        + ' categories.name_th as catetory_name_en,'
        + ' categories.description_th as category_description_en,'
        + ' products.name_th as product_name_th,'
        + ' products.description_th as product_description_th,'
        + ' products.name_en as product_name_en,'
        + ' products.description_en as product_description_en,'
        + ' products.price as product_price'
        + ' from categories'
        + ' inner join product_category on categories.category_id = product_category.category_id'
        + ' inner join products on product_category.product_id = products.product_id'
        + ' where'
        + ' products.is_enable = true'
        + ' and products.is_delete = false'
    );
  } catch (err) {
    throw err;
  }
};

productModel.findPagination = async ({
  productId,
  nameTh,
  nameEn,
  price,
  updateTime,
  isEnabled = true,
  isDeleted = false,
  isRecommended,
  orderBy,
  direction = 'asc',
  pageSize,
  page
}) => {
  try {
    return await db.query(
      'SELECT * FROM products WHERE'
        + ' TRUE'
        + ` and ${productId ? `"product_id" = ${productId}` : ' TRUE'}`
        + ` and ${nameTh ? `"name_th" = '${nameTh}'` : ' TRUE'}`
        + ` and ${nameEn ? `"name_en" = '${nameEn}'` : ' TRUE'}`
        + ` and ${price ? `"price" = ${price}` : ' TRUE'}`
        + ` and ${updateTime ? `"update_time" = '${updateTime}'::timestamp` : ' TRUE'}`
        + ` and ${[true, false].includes(isEnabled) && isEnabled.toString() ? `"is_enabled" = ${isEnabled}` : ' TRUE'}`
        + ` and ${[true, false].includes(isDeleted) && isDeleted.toString() ? `"is_deleted" = ${isDeleted}` : ' TRUE'}`
        + ` and ${[true, false].includes(isRecommended) && isRecommended.toString() ? `"is_recommended" = ${isRecommended}` : ' TRUE'}`
        + ` and ${!!(productId || nameTh || nameEn || price || updateTime || isEnabled || isDeleted || isRecommended)}`
        + ` order by "${changeCase.strSnake(orderBy)}"`
        + ` ${direction}`
        + ` limit ${pageSize} offset ${page * pageSize}`
    );
  } catch (err) {
    throw err;
  }
};

productModel.getAmount = async ({
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
    return await db.query(
      'SELECT COUNT(product_id) as product_total FROM products WHERE'
        + ' TRUE'
        + ` and ${productId ? `"product_id" = ${productId}` : ' TRUE'}`
        + ` and ${nameTh ? `"name_th" = '${nameTh}'` : ' TRUE'}`
        + ` and ${nameEn ? `"name_en" = '${nameEn}'` : ' TRUE'}`
        + ` and ${price ? `"price" = ${price}` : ' TRUE'}`
        + ` and ${updateTime ? `"update_time" = '${updateTime}'::timestamp` : ' TRUE'}`
        + ` and ${[true, false].includes(isEnabled) && isEnabled.toString() ? `"is_enabled" = ${isEnabled}` : ' TRUE'}`
        + ` and ${[true, false].includes(isDeleted) && isDeleted.toString() ? `"is_deleted" = ${isDeleted}` : ' TRUE'}`
        + ` and ${[true, false].includes(isRecommended) && isRecommended.toString() ? `"is_recommended" = ${isRecommended}` : ' TRUE'}`
        + ` and ${!!(productId || nameTh || nameEn || price || updateTime || isEnabled || isDeleted || isRecommended)}`
    );
  } catch (err) {
    throw err;
  }
};

productModel.findPaginationProductInCategory = async ({
  categoryId,
  categoryNameTh,
  categoryNameEn,
  orderBy,
  direction = 'asc',
  pageSize,
  page
}) => {
  try {
    return await db.query(
      'SELECT'
        + ' categories.category_id as category_id,'
        + ' categories.name_th as catetory_name_th,'
        + ' categories.description_th as category_description_th,'
        + ' categories.name_en as catetory_name_en,'
        + ' categories.description_en as category_description_en,'
        + ' products.product_id as product_id,'
        + ' products.name_th as product_name_th,'
        + ' products.description_th as product_description_th,'
        + ' products.name_en as product_name_en,'
        + ' products.description_en as product_description_en,'
        + ' products.price as product_price'
        + ' from categories'
        + ' inner join product_category on categories.category_id = product_category.category_id'
        + ' inner join products on product_category.product_id = products.product_id'
        + ' where'
        + ' products.is_enabled = true'
        + ' and products.is_deleted = false'
        + ` and ${categoryId ? ` categories.category_id = '${categoryId}'` : ' TRUE'}`
        + ` and ${categoryNameTh ? ` categories.name_th = '${categoryNameTh}'` : ' TRUE'}`
        + ` and ${categoryNameEn ? ` categories.name_en = '${categoryNameEn}'` : ' TRUE'}`
        + ` and ${!!(categoryId || categoryNameTh || categoryNameEn)}`
        + ` order by "${changeCase.strSnake(orderBy)}"`
        + ` ${direction}`
        + ` limit ${pageSize} offset ${page * pageSize}`
    );
  } catch (err) {
    throw err;
  }
};

productModel.getAmountProductInCategory = async ({
  categoryId,
  categoryNameTh,
  categoryNameEn
}) => {
  try {
    return await db.query(
      'SELECT'
        + ' COUNT(products.product_id) as product_total'
        + ' from categories'
        + ' inner join product_category on categories.category_id = product_category.category_id'
        + ' inner join products on product_category.product_id = products.product_id'
        + ' WHERE'
        + ' products.is_enabled = true'
        + ' and products.is_deleted = false'
        + ` and ${categoryId ? `categories.category_id = '${categoryId}'` : ' TRUE'}`
        + ` and ${categoryNameTh ? `categories.name_th = '${categoryNameTh}'` : ' TRUE'}`
        + ` and ${categoryNameEn ? `categories.name_en = '${categoryNameEn}'` : ' TRUE'}`
        + ` and ${!!(categoryId || categoryNameTh || categoryNameEn)}`
    );
  } catch (err) {
    throw err;
  }
};

productModel.findOne = async ({
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
    return await db.query(
      'SELECT * FROM products WHERE'
        + ' TRUE'
        + ` and ${productId ? `"product_id" = ${productId}` : ' TRUE'}`
        + ` and ${nameTh ? `"name_th" = ${nameTh}` : ' TRUE'}`
        + ` and ${nameEn ? `"name_en" = ${nameEn}` : ' TRUE'}`
        + ` and ${price ? `"price" = ${price}` : ' TRUE'}`
        + ` and ${updateTime ? `"update_time" = '${updateTime}'::timestamp` : ' TRUE'}`
        + ` and ${isEnabled ? `"is_enabled" = ${isEnabled}` : ' TRUE'}`
        + ` and ${isDeleted ? `"is_deleted" = ${isDeleted}` : ' TRUE'}`
        + ` and ${isRecommended ? `"is_recommended" = ${isRecommended}` : ' TRUE'}`
        + ` and ${!!(productId || nameTh || nameEn || price || updateTime || isEnabled || isDeleted || isRecommended)}`
        + ' limit 1'
    );
  } catch (err) {
    throw err;
  }
};

productModel.findMany = async ({
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
    return await db.query(
      'SELECT * FROM products WHERE'
        + ' TRUE'
        + ` and ${productId ? `"product_id" = ${productId}` : ' TRUE'}`
        + ` and ${nameTh ? `"name_th" = '${nameTh}'` : ' TRUE'}`
        + ` and ${nameEn ? `"name_en" = '${nameEn}'` : ' TRUE'}`
        + ` and ${price ? `"price" = ${price}` : ' TRUE'}`
        + ` and ${updateTime ? `"update_time" = '${updateTime}'::timestamp` : ' TRUE'}`
        + ` and ${isEnabled ? `"is_enabled" = ${isEnabled}` : ' TRUE'}`
        + ` and ${isDeleted ? `"is_deleted" = ${isDeleted}` : ' TRUE'}`
        + ` and ${isRecommended ? `"is_recommended" = ${isRecommended}` : ' TRUE'}`
        + ` and ${!!(productId || nameTh || nameEn || price || updateTime || isEnabled || isDeleted || isRecommended)}`
    );
  } catch (err) {
    throw err;
  }
};

export default productModel;