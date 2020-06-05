import db from '../db';

const optionModel = {};

optionModel.findOptionByProduct = async ({
  productId,
  productNameTh,
  productNameEn
}) => {
  try {
    return await db.query(
      'SELECT'
        + ' products.product_id as product_id,'
        + ' products.name_th as product_name_th,'
        + ' products.description_th as product_description_th,'
        + ' products.name_en as product_name_en,'
        + ' products.description_en as product_description_en,'
        + ' products.price as product_price,'
        + ' options.option_id as option_id,'
        + ' options.name_th as option_name_th,'
        + ' options.name_en as option_name_en,'
        + ' options.description_th as option_description_th,'
        + ' options.description_en as option_description_en'
        + ' from products'
        + ' inner join option_menus on products.product_id = option_menus.product_id'
        + ' inner join options on option_menus.option_id = options.option_id'
        + ' where'
        + ' products.is_enabled = true'
        + ' and products.is_deleted = false'
        + ` and ${productId ? ` products.product_id = ${productId}` : ' TRUE'}`
        + ` and ${productNameTh ? ` products.name_th = '${productNameTh}'` : ' TRUE'}`
        + ` and ${productNameEn ? ` products.name_en = '${productNameEn}'` : ' TRUE'}`
    );
  } catch (err) {
    throw err;
  }
};

export default optionModel;