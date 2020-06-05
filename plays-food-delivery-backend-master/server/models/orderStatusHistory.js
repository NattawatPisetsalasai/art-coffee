import db from '../db';
import changeCase from '../../utils/changeCase';

const orderStatusHistoryModel = {};

orderStatusHistoryModel.insertOne = async ({
  orderId,
  statusId,
  datetime
}) => {
  try {
    return await db.query(
      'INSERT INTO order_status_histories'
        + ' ('
        + ' order_id'
        + `${statusId ? ', status_id' : ''}`
        + `${datetime ? ', datetime' : ''}`
        + ' ) VALUES ('
        + `${orderId}`
        + `${statusId ? `, ${statusId}` : ''}`
        + `${datetime ? `, '${datetime}'::timestamp` : ''}`
        + ') RETURNING *'
    );
  } catch (err) {
    throw err;
  }
};

orderStatusHistoryModel.findOne = async ({
  historyId,
  orderId,
  statusId,
  datetime,
  orderBy,
  direction = 'asc',
}) => {
  try {
    return await db.query(
      'SELECT * FROM order_status_histories WHERE'
        + ' TRUE'
        + ` and ${historyId ? `"history_id" = ${historyId}` : ' TRUE'}`
        + ` and ${orderId ? `"order_id" = ${orderId}` : ' TRUE'}`
        + ` and ${statusId ? `"status_id" = ${statusId}` : ' TRUE'}`
        + ` and ${datetime ? `"datetime" = '${datetime}'::timestamp` : ' TRUE'}`
        + ` and ${!!(historyId || orderId || statusId || datetime)}`
        + ` order by "${changeCase.strSnake(orderBy) || 'history_id'}"`
        + ` ${direction}`
        + ' limit 1'
    );
  } catch (err) {
    throw err;
  }
};

orderStatusHistoryModel.findMany = async ({
  historyId,
  orderId,
  statusId,
  datetime,
  orderBy,
  direction = 'asc',
}) => {
  try {
    return await db.query(
      'SELECT * FROM order_status_histories WHERE'
        + ' TRUE'
        + ` and ${historyId ? `"history_id" = ${historyId}` : ' TRUE'}`
        + ` and ${orderId ? `"order_id" = ${orderId}` : ' TRUE'}`
        + ` and ${statusId ? `"status_id" = ${statusId}` : ' TRUE'}`
        + ` and ${datetime ? `"datetime" = '${datetime}'::timestamp` : ' TRUE'}`
        + ` and ${!!(historyId || orderId || statusId || datetime)}`
        + ` order by "${changeCase.strSnake(orderBy) || 'history_id'}"`
        + ` ${direction}`
    );
  } catch (err) {
    throw err;
  }
};

export default orderStatusHistoryModel;