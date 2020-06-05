import db from '../db';

const statusModel = {};

statusModel.insertOne = async ({
  nameCustomerTh,
  nameCustomerEn,
  nameRestaurantTh,
  nameRestaurantEn,
  descriptionTh,
  descriptionEn
}) => {
  try {
    return await db.query(
      'INSERT INTO status'
        + ' ('
        + ' name_customer_th'
        + `${nameCustomerEn ? ', name_customer_en' : ''}`
        + `${nameRestaurantTh ? ', name_restaurant_th' : ''}`
        + `${nameRestaurantEn ? ', name_restaurant_en' : ''}`
        + `${descriptionTh ? ', description_th' : ''}`
        + `${descriptionEn ? ', description_en' : ''}`
        + ' ) VALUES ('
        + `${nameCustomerTh}`
        + `${nameCustomerEn ? `, '${nameCustomerEn}'` : ''}`
        + `${nameRestaurantTh ? `, '${nameRestaurantTh}'` : ''}`
        + `${nameRestaurantEn ? `, '${nameRestaurantEn}'` : ''}`
        + `${descriptionTh ? `, '${descriptionTh}'` : ''}`
        + `${descriptionEn ? `, '${descriptionEn}'` : ''}`
        + ') RETURNING *'
    );
  } catch (err) {
    throw err;
  }
};

statusModel.updateOne = async ({
  statusId,
  nameCustomerTh,
  nameCustomerEn,
  nameRestaurantTh,
  nameRestaurantEn,
  descriptionTh,
  descriptionEn
}) => {
  try {
    return await db.query(
      'UPDATE status SET'
          + ' ('
          + ' status_id'
          + `${nameCustomerTh ? ', nameCustomer_th' : ''}`
          + `${nameCustomerEn ? ', nameCustomer_en' : ''}`
          + `${nameRestaurantTh ? ', nameRestaurant_th' : ''}`
          + `${nameRestaurantEn ? ', nameRestaurant_en' : ''}`
          + `${descriptionTh ? ', description_th' : ''}`
          + `${descriptionEn ? ', description_en' : ''}`
          + ' ) = ('
          + ` ${statusId}`
          + `${nameCustomerTh ? `, '${nameCustomerTh}'` : ''}`
          + `${nameCustomerEn ? `, '${nameCustomerEn}'` : ''}`
          + `${nameRestaurantTh ? `, '${nameRestaurantTh}'` : ''}`
          + `${nameRestaurantEn ? `, '${nameRestaurantEn}'` : ''}`
          + `${descriptionTh ? `, '${descriptionTh}'` : ''}`
          + `${descriptionEn ? `, '${descriptionEn}'` : ''}`
          + `) WHERE status_id = '${statusId}'`
          + ' RETURNING *'
    );
  } catch (err) {
    throw err;
  }
};

statusModel.findOne = async ({
  statusId,
  nameCustomerTh,
  nameCustomerEn,
  nameRestaurantTh,
  nameRestaurantEn,
  descriptionTh,
  descriptionEn
}) => {
  try {
    return await db.query(
      'SELECT * FROM status WHERE'
            + ' TRUE'
            + ` and ${statusId ? `"status_id" = ${statusId}` : ' TRUE'}`
            + ` and ${nameCustomerTh ? `"name_customer_th" = '${nameCustomerTh}'` : ' TRUE'}`
            + ` and ${nameCustomerEn ? `"name_customer_en" = '${nameCustomerEn}'` : ' TRUE'}`
            + ` and ${nameRestaurantTh ? `"name_restaurant_th" = '${nameRestaurantTh}'` : ' TRUE'}`
            + ` and ${nameRestaurantEn ? `"name_restaurant_en" = '${nameRestaurantEn}'` : ' TRUE'}`
            + ` and ${descriptionTh ? `"description_th" = '${descriptionTh}'` : ' TRUE'}`
            + ` and ${descriptionEn ? `"description_en" = '${descriptionEn}'` : ' TRUE'}`
            + ` and ${!!(statusId || nameCustomerTh || nameCustomerEn || nameRestaurantTh || nameRestaurantEn || descriptionTh || descriptionEn)}`
            + ' limit 1'
    );
  } catch (err) {
    throw err;
  }
};

statusModel.findMany = async ({
  statusId,
  nameCustomerTh,
  nameCustomerEn,
  nameRestaurantTh,
  nameRestaurantEn,
  descriptionTh,
  descriptionEn
}) => {
  try {
    return await db.query(
      'SELECT * FROM status WHERE'
              + ' TRUE'
              + ` and ${statusId ? `"status_id" = ${statusId}` : ' TRUE'}`
              + ` and ${nameCustomerTh ? `"name_customer_th" = '${nameCustomerTh}'` : ' TRUE'}`
              + ` and ${nameCustomerEn ? `"name_customer_en" = '${nameCustomerEn}'` : ' TRUE'}`
              + ` and ${nameRestaurantTh ? `"name_restaurant_th" = '${nameRestaurantTh}'` : ' TRUE'}`
              + ` and ${nameRestaurantEn ? `"name_restaurant_en" = '${nameRestaurantEn}'` : ' TRUE'}`
              + ` and ${descriptionTh ? `"description_th" = '${descriptionTh}'` : ' TRUE'}`
              + ` and ${descriptionEn ? `"description_en" = '${descriptionEn}'` : ' TRUE'}`
              + ` and ${!!(statusId || nameCustomerTh || nameCustomerEn || nameRestaurantTh || nameRestaurantEn || descriptionTh || descriptionEn)}`
    );
  } catch (err) {
    throw err;
  }
};

export default statusModel;