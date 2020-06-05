import db from '../db';

const orderItemModel = {};

orderItemModel.insertOne = async ({
  orderId,
  productId,
  comment,
  amount
}) => {
  try {
    return await db.query(
      'INSERT INTO order_items'
        + ' ('
        + `${orderId ? ' order_id' : ''}`
        + `${productId ? ', product_id' : ''}`
        + `${comment ? ', comment' : ''}`
        + `${amount ? ', amount' : ''}`
        + ' ) VALUES ('
        + `${orderId ? ` ${orderId}` : ''}`
        + `${productId ? `, ${productId}` : ''}`
        + `${comment ? `, '${comment}'` : ''}`
        + `${amount ? `, ${amount}` : ''}`
        + ') RETURNING *'
    );
  } catch (err) {
    throw err;
  }
};

orderItemModel.findMany = async ({
  itemId,
  orderId,
  productId,
  comment,
  amount
}) => {
  try {
    return await db.query(
      'SELECT * FROM order_items WHERE'
        + ' TRUE'
        + ` and ${itemId ? `"item_id" = ${itemId}` : ' TRUE'}`
        + ` and ${orderId ? `"order_id" = ${orderId}` : ' TRUE'}`
        + ` and ${productId ? `"product_id" = ${productId}` : ' TRUE'}`
        + ` and ${comment ? `"comment" = '${comment}'` : ' TRUE'}`
        + ` and ${amount ? `"amount" = ${amount}` : ' TRUE'}`
        + ` and ${!!(itemId || orderId || productId || comment || amount)}`
    );
  } catch (err) {
    throw err;
  }
};

export default orderItemModel;