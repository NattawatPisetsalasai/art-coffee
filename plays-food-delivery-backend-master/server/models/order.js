import db from '../db';
import changeCase from '../../utils/changeCase';

const orderModel = {};

orderModel.insertOne = async ({
  customerId,
  paymentId,
  billingAddressId,
  shippingAddressId,
  branchId,
  isPickup,
  pickupAppointTime,
  pickupTime,
  createTime,
  printedTime
}) => {
  try {
    return await db.query(
      'INSERT INTO orders'
        + ' ('
        + ' customer_id'
        + `${paymentId ? ', payment_id' : ''}`
        + `${billingAddressId ? ', billing_address_id' : ''}`
        + `${shippingAddressId ? ', shipping_address_id' : ''}`
        + `${branchId ? ', branch_id' : ''}`
        + `${[true, false].includes(isPickup) && isPickup.toString() ? ', is_pickup' : ''}`
        + `${pickupAppointTime ? ', pickup_appoint_time' : ''}`
        + `${pickupTime ? ', pickup_time' : ''}`
        + `${createTime ? ', create_time' : ''}`
        + `${printedTime ? ', printed_time' : ''}`
        + ' ) VALUES ('
        + `${customerId}`
        + `${paymentId ? `, ${paymentId}` : ''}`
        + `${billingAddressId ? `, ${billingAddressId}` : ''}`
        + `${shippingAddressId ? `, ${shippingAddressId}` : ''}`
        + `${branchId ? `, ${branchId}` : ''}`
        + `${[true, false].includes(isPickup) && isPickup.toString() ? `, ${isPickup}` : ''}`
        + `${pickupAppointTime ? `, '${pickupAppointTime}'::timestamp` : ''}`
        + `${pickupTime ? `, '${pickupTime}'::timestamp` : ''}`
        + `${createTime ? `, '${createTime}'::timestamp` : ''}`
        + `${printedTime ? `, '${printedTime}'::timestamp` : ''}`
        + ') RETURNING *'
    );
  } catch (err) {
    throw err;
  }
};

orderModel.updateOne = async ({
  orderId,
  customerId,
  paymentId,
  billingAddressId,
  shippingAddressId,
  branchId,
  isPickup,
  pickupAppointTime,
  pickupTime,
  createTime,
  printedTime,
  totalPrice
}) => {
  try {
    return await db.query(
      'UPDATE orders SET'
          + ' ('
          + ' order_id'
          + `${customerId ? ', customer_id' : ''}`
          + `${paymentId ? ', payment_id' : ''}`
          + `${billingAddressId ? ', billing_address_id' : ''}`
          + `${shippingAddressId ? ', shipping_address_id' : ''}`
          + `${branchId ? ', branch_id' : ''}`
          + `${[true, false].includes(isPickup) && isPickup.toString() ? ', is_pickup' : ''}`
          + `${pickupAppointTime ? ', pickup_appoint_time' : ''}`
          + `${pickupTime ? ', pickup_time' : ''}`
          + `${createTime ? ', create_time' : ''}`
          + `${printedTime ? ', printed_time' : ''}`
          + `${totalPrice ? ', total_price' : ''}`
          + ' ) = ('
          + ` ${orderId}`
          + `${customerId ? `, ${customerId}` : ''}`
          + `${paymentId ? `, ${paymentId}` : ''}`
          + `${billingAddressId ? `, ${billingAddressId}` : ''}`
          + `${shippingAddressId ? `, ${shippingAddressId}` : ''}`
          + `${branchId ? `, ${branchId}` : ''}`
          + `${[true, false].includes(isPickup) && isPickup.toString() ? `, ${isPickup}` : ''}`
          + `${pickupAppointTime ? `, '${pickupAppointTime}'::timestamp` : ''}`
          + `${pickupTime ? `, '${pickupTime}'::timestamp` : ''}`
          + `${createTime ? `, '${createTime}'::timestamp` : ''}`
          + `${printedTime ? `, '${printedTime}'::timestamp` : ''}`
          + `${totalPrice ? `, ${totalPrice}` : ''}`
          + `) WHERE order_id = '${orderId}'`
          + ' RETURNING *'
    );
  } catch (err) {
    throw err;
  }
};

orderModel.findOne = async ({
  orderId,
  customerId,
  paymentId,
  billingAddressId,
  shippingAddressId,
  branchId,
  isPickup,
  pickupAppointTime,
  pickupTime,
  createTime,
  printedTime,
  totalPrice
}) => {
  try {
    return await db.query(
      'SELECT * FROM customers WHERE'
            + ' TRUE'
            + ` and ${orderId ? `"order_id" = ${orderId}` : ' TRUE'}`
            + ` and ${customerId ? `"customer_id" = ${customerId}` : ' TRUE'}`
            + ` and ${paymentId ? `"payment_id" = ${paymentId}` : ' TRUE'}`
            + ` and ${billingAddressId ? `"billing_address_id" = ${billingAddressId}` : ' TRUE'}`
            + ` and ${shippingAddressId ? `"shipping_address_id" = ${shippingAddressId}` : ' TRUE'}`
            + ` and ${branchId ? `"branch_id" = ${branchId}` : ' TRUE'}`
            + ` and ${[true, false].includes(isPickup) && isPickup.toString() ? `"is_pickup" = ${isPickup}` : ' TRUE'}`
            + ` and ${pickupAppointTime ? `"pickup_appoint_time" = '${pickupAppointTime}'::timestamp` : ' TRUE'}`
            + ` and ${pickupTime ? `"pickup_time" = '${pickupTime}'::timestamp` : ' TRUE'}`
            + ` and ${createTime ? `"create_time" = '${createTime}'::timestamp` : ' TRUE'}`
            + ` and ${printedTime ? `"printed_time" = '${printedTime}'::timestamp` : ' TRUE'}`
            + ` and ${totalPrice ? `"total_price" = ${totalPrice}` : ' TRUE'}`
            + ` and ${!!(orderId || customerId || paymentId || billingAddressId || shippingAddressId || branchId || isPickup || pickupAppointTime || pickupTime || createTime || printedTime || totalPrice)}`
            + ' limit 1'
    );
  } catch (err) {
    throw err;
  }
};

orderModel.findMany = async ({
  orderId,
  customerId,
  paymentId,
  billingAddressId,
  shippingAddressId,
  branchId,
  isPickup,
  pickupAppointTime,
  pickupTime,
  createTime,
  printedTime,
  totalPrice
}) => {
  try {
    return await db.query(
      'SELECT * FROM customers WHERE'
            + ' TRUE'
            + ` and ${orderId ? `"order_id" = ${orderId}` : ' TRUE'}`
            + ` and ${customerId ? `"customer_id" = ${customerId}` : ' TRUE'}`
            + ` and ${paymentId ? `"payment_id" = ${paymentId}` : ' TRUE'}`
            + ` and ${billingAddressId ? `"billing_address_id" = ${billingAddressId}` : ' TRUE'}`
            + ` and ${shippingAddressId ? `"shipping_address_id" = ${shippingAddressId}` : ' TRUE'}`
            + ` and ${branchId ? `"branch_id" = ${branchId}` : ' TRUE'}`
            + ` and ${[true, false].includes(isPickup) && isPickup.toString() ? `"is_pickup" = ${isPickup}` : ' TRUE'}`
            + ` and ${pickupAppointTime ? `"pickup_appoint_time" = '${pickupAppointTime}'::timestamp` : ' TRUE'}`
            + ` and ${pickupTime ? `"pickup_time" = '${pickupTime}'::timestamp` : ' TRUE'}`
            + ` and ${createTime ? `"create_time" = '${createTime}'::timestamp` : ' TRUE'}`
            + ` and ${printedTime ? `"printed_time" = '${printedTime}'::timestamp` : ' TRUE'}`
            + ` and ${totalPrice ? `"total_price" = ${totalPrice}` : ' TRUE'}`
            + ` and ${!!(orderId || customerId || paymentId || billingAddressId || shippingAddressId || branchId || isPickup || pickupAppointTime || pickupTime || createTime || printedTime || totalPrice)}`
    );
  } catch (err) {
    throw err;
  }
};

orderModel.findPagiantion = async ({
  orderId,
  customerId,
  paymentId,
  billingAddressId,
  shippingAddressId,
  branchId,
  isPickup,
  pickupAppointTime,
  pickupTime,
  createTime,
  printedTime,
  totalPrice,
  orderBy,
  direction = 'asc',
  pageSize,
  page
}) => {
  try {
    return await db.query(
      'SELECT * FROM orders WHERE'
            + ' TRUE'
            + ` and ${orderId ? `"order_id" = ${orderId}` : ' TRUE'}`
            + ` and ${customerId ? `"customer_id" = ${customerId}` : ' TRUE'}`
            + ` and ${paymentId ? `"payment_id" = ${paymentId}` : ' TRUE'}`
            + ` and ${billingAddressId ? `"billing_address_id" = ${billingAddressId}` : ' TRUE'}`
            + ` and ${shippingAddressId ? `"shipping_address_id" = ${shippingAddressId}` : ' TRUE'}`
            + ` and ${branchId ? `"branch_id" = ${branchId}` : ' TRUE'}`
            + ` and ${[true, false].includes(isPickup) && isPickup.toString() ? `"is_pickup" = ${isPickup}` : ' TRUE'}`
            + ` and ${pickupAppointTime ? `"pickup_appoint_time" = '${pickupAppointTime}'::timestamp` : ' TRUE'}`
            + ` and ${pickupTime ? `"pickup_time" = '${pickupTime}'::timestamp` : ' TRUE'}`
            + ` and ${createTime ? `"create_time" = '${createTime}'::timestamp` : ' TRUE'}`
            + ` and ${printedTime ? `"printed_time" = '${printedTime}'::timestamp` : ' TRUE'}`
            + ` and ${totalPrice ? `"total_price" = ${totalPrice}` : ' TRUE'}`
            + ` and ${!!(orderId || customerId || paymentId || billingAddressId || shippingAddressId || branchId || isPickup || pickupAppointTime || pickupTime || createTime || printedTime || totalPrice)}`
            + ` order by "${changeCase.strSnake(orderBy)}"`
            + ` ${direction}`
            + ` limit ${pageSize} offset ${page * pageSize}`
    );
  } catch (err) {
    throw err;
  }
};

orderModel.findOrderWithStatusMany = async ({
  orderId,
  customerId,
  paymentId,
  billingAddressId,
  shippingAddressId,
  branchId,
  isPickup,
  pickupAppointTime,
  pickupTime,
  createTime,
  printedTime,
  totalPrice,
  arrStatusId
}) => {
  try {
    return await db.query(
      'SELECT'
        + ' current_timestamp as now_timestamp,'
        + ' orders.order_id as order_id,'
        + ' orders.create_time as create_time,'
        + ' orders.total_price as total_price,'
        + ' orders.customer_id as customer_id,'
        + ' orders.shipping_address_id as address_id,'
        + ' order_status_histories.datetime as status_time,'
        + ' status.status_id as status_id,'
        + ' status.name_customer_th as name_customer_th,'
        + ' status.name_customer_en as name_customer_en,'
        + ' status.name_restaurant_th as name_restaurant_th,'
        + ' status.name_restaurant_en as name_restaurant_en,'
        + ' status.description_th as description_th,'
        + ' status.description_en as description_en'
        + ' FROM orders'
        + ' INNER JOIN (SELECT order_id, MAX(status_id) as status_id'
        + ' FROM order_status_histories'
        + ' GROUP BY order_id ORDER BY order_id) as status_max On orders.order_id = status_max.order_id'
        + ' INNER JOIN order_status_histories on status_max.order_id = order_status_histories.order_id'
        + ' AND status_max.status_id =  order_status_histories.status_id'
        + ' INNER JOIN status ON order_status_histories.status_id = status.status_id'
        + ' WHERE'
        + ' TRUE'
        + ` and ${orderId ? `"order_id" = ${orderId}` : ' TRUE'}`
        + ` and ${customerId ? `orders.customer_id = ${customerId}` : ' TRUE'}`
        + ` and ${paymentId ? `"payment_id" = ${paymentId}` : ' TRUE'}`
        + ` and ${billingAddressId ? `"billing_address_id" = ${billingAddressId}` : ' TRUE'}`
        + ` and ${shippingAddressId ? `"shipping_address_id" = ${shippingAddressId}` : ' TRUE'}`
        + ` and ${branchId ? `"branch_id" = ${branchId}` : ' TRUE'}`
        + ` and ${[true, false].includes(isPickup) && isPickup.toString() ? `"is_pickup" = ${isPickup}` : ' TRUE'}`
        + ` and ${pickupAppointTime ? `"pickup_appoint_time" = '${pickupAppointTime}'::timestamp` : ' TRUE'}`
        + ` and ${pickupTime ? `"pickup_time" = '${pickupTime}'::timestamp` : ' TRUE'}`
        + ` and ${createTime ? `"create_time" = '${createTime}'::timestamp` : ' TRUE'}`
        + ` and ${printedTime ? `"printed_time" = '${printedTime}'::timestamp` : ' TRUE'}`
        + ` and ${totalPrice ? `"total_price" = ${totalPrice}` : ' TRUE'}`
        + ` and order_status_histories.status_id IN (${arrStatusId.join(',')})`
        + ` and ${!!(orderId || customerId || paymentId || billingAddressId || shippingAddressId || branchId || isPickup || pickupAppointTime || pickupTime || createTime || printedTime || totalPrice || arrStatusId)}`
        + ' order by orders.order_id DESC, status.status_id DESC'
    );
  } catch (err) {
    throw err;
  }
};

orderModel.getAmountOrderWithStatus = async ({
  orderId,
  customerId,
  paymentId,
  billingAddressId,
  shippingAddressId,
  branchId,
  isPickup,
  pickupAppointTime,
  pickupTime,
  createTime,
  printedTime,
  totalPrice,
  arrStatusId
}) => {
  try {
    return await db.query(
      'SELECT'
        + ' COUNT(orders.order_id) as order_total'
        + ' FROM orders'
        + ' INNER JOIN (SELECT order_id, MAX(status_id) as status_id'
        + ' FROM order_status_histories'
        + ' GROUP BY order_id ORDER BY order_id) as status_max On orders.order_id = status_max.order_id'
        + ' INNER JOIN order_status_histories on status_max.order_id = order_status_histories.order_id'
        + ' AND status_max.status_id =  order_status_histories.status_id'
        + ' INNER JOIN status ON order_status_histories.status_id = status.status_id'
        + ' WHERE'
        + ' TRUE'
        + ` and ${orderId ? `"order_id" = ${orderId}` : ' TRUE'}`
        + ` and ${customerId ? `"customer_id" = ${customerId}` : ' TRUE'}`
        + ` and ${paymentId ? `"payment_id" = ${paymentId}` : ' TRUE'}`
        + ` and ${billingAddressId ? `"billing_address_id" = ${billingAddressId}` : ' TRUE'}`
        + ` and ${shippingAddressId ? `"shipping_address_id" = ${shippingAddressId}` : ' TRUE'}`
        + ` and ${branchId ? `"branch_id" = ${branchId}` : ' TRUE'}`
        + ` and ${[true, false].includes(isPickup) && isPickup.toString() ? `"is_pickup" = ${isPickup}` : ' TRUE'}`
        + ` and ${pickupAppointTime ? `"pickup_appoint_time" = '${pickupAppointTime}'::timestamp` : ' TRUE'}`
        + ` and ${pickupTime ? `"pickup_time" = '${pickupTime}'::timestamp` : ' TRUE'}`
        + ` and ${createTime ? `"create_time" = '${createTime}'::timestamp` : ' TRUE'}`
        + ` and ${printedTime ? `"printed_time" = '${printedTime}'::timestamp` : ' TRUE'}`
        + ` and ${totalPrice ? `"total_price" = ${totalPrice}` : ' TRUE'}`
        + ` and status.status_id IN (${arrStatusId.join(',')})`
        + ` and ${!!(orderId || customerId || paymentId || billingAddressId || shippingAddressId || branchId || isPickup || pickupAppointTime || pickupTime || createTime || printedTime || totalPrice || arrStatusId)}`
    );
  } catch (err) {
    throw err;
  }
};

orderModel.findOrderWithStatusPagination = async ({
  orderId,
  customerId,
  paymentId,
  billingAddressId,
  shippingAddressId,
  branchId,
  isPickup,
  pickupAppointTime,
  pickupTime,
  createTime,
  printedTime,
  totalPrice,
  arrStatusId,
  orderBy,
  direction = 'asc',
  pageSize,
  page
}) => {
  try {
    return await db.query(
      'SELECT'
        + ' current_timestamp as now_timestamp,'
        + ' orders.order_id as order_id,'
        + ' orders.create_time as create_time,'
        + ' orders.total_price as total_price,'
        + ' orders.customer_id as customer_id,'
        + ' orders.shipping_address_id as address_id,'
        + ' order_status_histories.datetime as status_time,'
        + ' status.status_id as status_id,'
        + ' status.name_customer_th as name_customer_th,'
        + ' status.name_customer_en as name_customer_en,'
        + ' status.name_restaurant_th as name_restaurant_th,'
        + ' status.name_restaurant_en as name_restaurant_en,'
        + ' status.description_th as description_th,'
        + ' status.description_en as description_en'
        + ' FROM orders'
        + ' INNER JOIN (SELECT order_id, MAX(status_id) as status_id'
        + ' FROM order_status_histories'
        + ' GROUP BY order_id ORDER BY order_id) as status_max On orders.order_id = status_max.order_id'
        + ' INNER JOIN order_status_histories on status_max.order_id = order_status_histories.order_id'
        + ' AND status_max.status_id =  order_status_histories.status_id'
        + ' INNER JOIN status ON order_status_histories.status_id = status.status_id'
        + ' WHERE'
        + ' TRUE'
        + ` and ${orderId ? `"order_id" = ${orderId}` : ' TRUE'}`
        + ` and ${customerId ? `"customer_id" = ${customerId}` : ' TRUE'}`
        + ` and ${paymentId ? `"payment_id" = ${paymentId}` : ' TRUE'}`
        + ` and ${billingAddressId ? `"billing_address_id" = ${billingAddressId}` : ' TRUE'}`
        + ` and ${shippingAddressId ? `"shipping_address_id" = ${shippingAddressId}` : ' TRUE'}`
        + ` and ${branchId ? `"branch_id" = ${branchId}` : ' TRUE'}`
        + ` and ${[true, false].includes(isPickup) && isPickup.toString() ? `"is_pickup" = ${isPickup}` : ' TRUE'}`
        + ` and ${pickupAppointTime ? `"pickup_appoint_time" = '${pickupAppointTime}'::timestamp` : ' TRUE'}`
        + ` and ${pickupTime ? `"pickup_time" = '${pickupTime}'::timestamp` : ' TRUE'}`
        + ` and ${createTime ? `"create_time" = '${createTime}'::timestamp` : ' TRUE'}`
        + ` and ${printedTime ? `"printed_time" = '${printedTime}'::timestamp` : ' TRUE'}`
        + ` and ${totalPrice ? `"total_price" = ${totalPrice}` : ' TRUE'}`
        + ` and status.status_id IN (${arrStatusId.join(',')})`
        + ` and ${!!(orderId || customerId || paymentId || billingAddressId || shippingAddressId || branchId || isPickup || pickupAppointTime || pickupTime || createTime || printedTime || totalPrice || arrStatusId)}`
        + ' order by order_status_histories.datetime DESC'
        + ` limit ${pageSize} offset ${page * pageSize}`
    );
  } catch (err) {
    throw err;
  }
};

orderModel.findNewOrderWithStatusMany = async ({
  orderId,
  customerId,
  createTime,
  arrStatusId,
  orderBy
}) => {
  try {
    return await db.query(
      'SELECT'
        + ' current_timestamp as now_timestamp,'
        + ' orders.order_id as order_id,'
        + ' orders.create_time as create_time,'
        + ' orders.total_price as total_price,'
        + ' orders.customer_id as customer_id,'
        + ' orders.shipping_address_id as address_id,'
        + ' order_status_histories.datetime as status_time,'
        + ' status.status_id as status_id,'
        + ' status.name_customer_th as name_customer_th,'
        + ' status.name_customer_en as name_customer_en,'
        + ' status.name_restaurant_th as name_restaurant_th,'
        + ' status.name_restaurant_en as name_restaurant_en,'
        + ' status.description_th as description_th,'
        + ' status.description_en as description_en'
        + ' FROM orders'
        + ' INNER JOIN (SELECT order_id, MAX(status_id) as status_id'
        + ' FROM order_status_histories'
        + ' GROUP BY order_id ORDER BY order_id) as status_max On orders.order_id = status_max.order_id'
        + ' INNER JOIN order_status_histories on status_max.order_id = order_status_histories.order_id'
        + ' AND status_max.status_id =  order_status_histories.status_id'
        + ' INNER JOIN status ON order_status_histories.status_id = status.status_id'
        + ' WHERE'
        + ' TRUE'
        + ` and ${orderId ? `"order_id" = ${orderId}` : ' TRUE'}`
        + ` and ${customerId ? `"customer_id" = ${customerId}` : ' TRUE'}`
        + ` and ${createTime ? `"create_time" >= '${createTime}'::timestamp` : ' TRUE'}`
        + ` and status.status_id IN (${arrStatusId.join(',')})`
        + ` and ${!!(orderId || customerId || createTime || arrStatusId)}`
        + ` order by orders.order_id ${orderBy || 'DESC'}`
    );
  } catch (err) {
    throw err;
  }
};

orderModel.findCurrentOrderWithStatusMany = async ({
  orderId,
  customerId,
  createTime,
  arrStatusId
}) => {
  try {
    return await db.query(
      'SELECT'
        + ' current_timestamp as now_timestamp,'
        + ' orders.order_id as order_id,'
        + ' orders.create_time as create_time,'
        + ' orders.total_price as total_price,'
        + ' orders.customer_id as customer_id,'
        + ' orders.shipping_address_id as address_id,'
        + ' order_status_histories.datetime as status_time,'
        + ' status.status_id as status_id,'
        + ' status.name_customer_th as name_customer_th,'
        + ' status.name_customer_en as name_customer_en,'
        + ' status.name_restaurant_th as name_restaurant_th,'
        + ' status.name_restaurant_en as name_restaurant_en,'
        + ' status.description_th as description_th,'
        + ' status.description_en as description_en'
        + ' FROM orders'
        + ' INNER JOIN (SELECT order_id, MAX(status_id) as status_id'
        + ' FROM order_status_histories'
        + ' GROUP BY order_id ORDER BY order_id) as status_max On orders.order_id = status_max.order_id'
        + ' INNER JOIN order_status_histories on status_max.order_id = order_status_histories.order_id'
        + ' AND status_max.status_id =  order_status_histories.status_id'
        + ' INNER JOIN status ON order_status_histories.status_id = status.status_id'
        + ' WHERE'
        + ' TRUE'
        + ` and ${orderId ? `"order_id" = ${orderId}` : ' TRUE'}`
        + ` and ${customerId ? `"customer_id" = ${customerId}` : ' TRUE'}`
        + ` and ${createTime ? `"create_time" < '${createTime}'::timestamp` : ' TRUE'}`
        + ` and status.status_id IN (${arrStatusId.join(',')})`
        + ` and order_status_histories.datetime > '${createTime}'::timestamp`
        + ` and ${!!(orderId || customerId || createTime || arrStatusId)}`
        + ' order by orders.order_id DESC'
    );
  } catch (err) {
    throw err;
  }
};

export default orderModel;