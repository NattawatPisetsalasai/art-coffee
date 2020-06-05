import changeCase from '../../utils/changeCase';

import orderModel from '../models/order';
import orderItemModel from '../models/orderItem';
import orderItemChoiceModel from '../models/orderItemChoice';
import orderStatusHistoryModel from '../models/orderStatusHistory';
import productModel from '../models/product';
import choiceModel from '../models/choice';
import statusModel from '../models/status';
import customerModel from '../models/customer';
import addressModel from '../models/address';
import gcs from '../../utils/gcs/gcs';

const orderService = {};

orderService.createOrder = async ({
  customerId,
  shippingAddressId,
  branchId,
  isPickup,
  pickupAppointTime,
  products
}) => {
  try {
    const orderResult = {};
    let totalPrice = parseFloat(0.00);

    let order = await orderModel.insertOne({
      customerId,
      shippingAddressId,
      branchId,
      isPickup,
      pickupAppointTime,
      createTime: changeCase.dateToTimestamp(Date.now())
    });

    order = changeCase.objCamel(order[0]);

    orderResult.orderId = order.orderId;
    orderResult.customerId = order.customerId;
    orderResult.shippingAddressId = order.shippingAddressId;
    orderResult.branchId = order.branchId;
    orderResult.isPickup = order.isPickup;
    orderResult.products = [];

    for (const product of products) {
      let item = await orderItemModel.insertOne({
        orderId: order.orderId,
        productId: product.productId,
        comment: product.comment,
        amount: product.amount
      });
      item = changeCase.objCamel(item[0]);

      const productResult = {
        productId: item.productId,
        amount: item.amount,
        comment: item.comment,
        options: {}
      };

      let productInfo = await productModel.findOne({
        productId: item.productId
      });
      productInfo = changeCase.objCamel(productInfo[0]);
      totalPrice += parseFloat(productInfo.price);

      for (const option in product.options) {
        for (const choiceId of product.options[option]) {
          let optionChoice = await orderItemChoiceModel.insertOne({
            itemId: item.itemId,
            optionId: parseInt(option, 10),
            choiceId
          });
          optionChoice = changeCase.objCamel(optionChoice[0]);
          if (!productResult.options[option]) {
            productResult.options[option] = [optionChoice.choiceId];
          } else {
            productResult.options[option].push(optionChoice.choiceId);
          }

          let choice = await choiceModel.findOne({
            choiceId
          });
          choice = changeCase.objCamel(choice[0]);
          totalPrice += parseFloat(choice.price);
        }
      }
      orderResult.products.push(productResult);
    }

    let orderHistory = await orderStatusHistoryModel.insertOne({
      orderId: order.orderId,
      statusId: 1,
      datetime: changeCase.dateToTimestamp(Date.now())
    });
    orderHistory = changeCase.objCamel(orderHistory[0]);

    orderResult.statusId = orderHistory.statusId;
    orderResult.datetime = orderHistory.datetime;

    let orderInfo = await orderModel.updateOne({
      orderId: order.orderId,
      totalPrice
    });
    orderInfo = changeCase.objCamel(orderInfo[0]);

    orderResult.totalPrice = orderInfo.totalPrice;

    return orderResult;
  } catch (err) {
    throw err;
  }
};

orderService.findMany = async ({
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
    let orders = await orderModel.findMany({
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
    });
    orders = changeCase.objInArrCamel(orders);
    return orders;
  } catch (err) {
    throw err;
  }
};

orderService.insertStatus = async (orders) => {
  try {
    const newOrders = [];
    for (const [i, order] of orders.entries()) {
      let orderStatus = await orderStatusHistoryModel.findMany({
        orderId: order.orderId
      });
      orderStatus = changeCase.objInArrCamel(orderStatus);
      const lastOrderStatus = orderStatus.pop();
      let status = await statusModel.findOne({
        statusId: lastOrderStatus.statusId
      });
      status = changeCase.objCamel(status[0]);
      orders[i].statusNameTh = status.nameCustomerTh;
      orders[i].statusNameEn = status.nameCustomerEn;

      if (status.statusId === '6' || status.statusId === '7' || status.statusId === '8') {
        newOrders.push(orders[i]);
      }
    }
    return newOrders;
  } catch (err) {
    throw err;
  }
};

orderService.findPagination = async ({
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
  direction,
  pageSize,
  page
}) => {
  try {
    let orders = await orderModel.findPagiantion({
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
      direction,
      pageSize,
      page
    });

    orders = changeCase.objInArrCamel(orders);
    return orders;
  } catch (err) {
    throw err;
  }
};

orderService.findActiveOne = async ({
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
    let orders = await orderModel.findOrderWithStatusMany({
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
      arrStatusId: [1, 2, 3]
    });

    orders = changeCase.objInArrCamel(orders);
    return orders;
  } catch (err) {
    throw err;
  }
};

orderService.groupOrderActive = async (orders) => {
  try {
    const newOrders = {};
    const arrOrders = [];
    for (const order of orders) {
      if (!newOrders[order.orderId]) {
        // checking status before adding

        newOrders[order.orderId] = {
          orderId: order.orderId,
          createTime: changeCase.timestampToShowedDate(order.createTime),
          totalPrice: order.totalPrice,
          status: {
            statusId: order.statusId,
            time: changeCase.dateToTimestamp(order.statusTime),
            nameCustomerTh: order.nameCustomerTh,
            nameCustomerEn: order.nameCustomerEn,
            nameRestaurantTh: order.nameRestaurantTh,
            nameRestaurantEn: order.nameRestaurantEn,
            descriptionTh: order.descriptionTh,
            descriptionEn: order.descriptionEn
          }
        };
      }
    }

    for (const order in newOrders) {
      arrOrders.push(newOrders[order]);
    }

    return arrOrders.reverse();
  } catch (err) {
    throw err;
  }
};

orderService.addItemInOrder = async (orders) => {
  try {
    const newOrders = [];
    for (const order of orders) {
      let orderItems = await orderItemModel.findMany({
        orderId: order.orderId
      });
      orderItems = changeCase.objInArrCamel(orderItems);

      order.totalPrice = parseFloat(order.totalPrice);
      const items = [];
      for (const item of orderItems) {
        let product = await productModel.findOne({
          productId: item.productId
        });
        product = changeCase.objCamel(product[0]);

        let orderItemChoices = await orderItemChoiceModel.findMany({
          itemId: item.itemId
        });
        orderItemChoices = changeCase.objInArrCamel(orderItemChoices);

        const choices = [];
        for (const itemChoice of orderItemChoices) {
          let choice = await choiceModel.findOne({
            choiceId: itemChoice.choiceId
          });
          choice = changeCase.objCamel(choice[0]);
          choices.push({
            choiceId: choice.choiceId,
            nameTh: choice.nameTh,
            nameEn: choice.nameEn,
            price: parseFloat(choice.price)
          });
        }

        items.push({
          itemId: item.itemId,
          productId: item.productId,
          nameTh: product.nameTh,
          nameEn: product.nameEn,
          price: parseFloat(product.price),
          comment: item.comment,
          amount: item.amount,
          choices
        });
      }

      order.items = items;
      newOrders.push(order);
    }
    return newOrders;
  } catch (err) {
    throw err;
  }
};

orderService.insertNextStatus = async ({
  orderId,
  statusId
}) => {
  try {
    let orderStatus = await orderStatusHistoryModel.insertOne({
      orderId,
      statusId,
      datetime: changeCase.dateToTimestamp(Date.now())
    });
    orderStatus = changeCase.objCamel(orderStatus[0]);
    return orderStatus;
  } catch (err) {
    throw err;
  }
};

orderService.checkInsertStatusValid = async ({
  orderId,
  statusId
}) => {
  try {
    let orderStatus = await orderStatusHistoryModel.findOne({
      orderId,
      orderBy: 'status_id',
      direction: 'DESC'
    });
    orderStatus = changeCase.objCamel(orderStatus[0]);

    if (orderStatus.statusId < statusId) {
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

orderService.findOrderByStatus = async (arrStatusId) => {
  try {
    const currentDate = changeCase.dateToTimestamp(Date.now());
    let orders = await orderModel.findNewOrderWithStatusMany({
      createTime: `${currentDate.split(' ')[0]} 00:00:00`,
      arrStatusId,
      orderBy: 'ASC'
    });
    orders = changeCase.objInArrCamel(orders);
    return orders;
  } catch (err) {
    throw err;
  }
};

orderService.getCustomerInfoByOrder = async (orders) => {
  try {
    for (const [i, order] of orders.entries()) {
      let customer = await customerModel.findOne({
        customerId: order.customerId
      });
      customer = changeCase.objCamel(customer[0]);

      let address = await addressModel.findOne({
        addressId: order.addressId
      });
      address = changeCase.objCamel(address[0]);

      orders[i].createTime = changeCase.timestampToShowedDate(orders[i].createTime);
      orders[i].addressName = `${address.addressLine} ${address.province} ${address.district} ${address.city} ${address.postalCode}`;
      orders[i].customer = {
        customerId: customer.customerId,
        username: customer.username,
        firstname: customer.firstname,
        lastanme: customer.lastname,
        phone: customer.phone
      };

      orders[i].status = {
        statusId: orders[i].statusId,
        time: changeCase.timestampToShowedDate(orders[i].statusTime),
        nameCustomerTh: orders[i].nameCustomerTh,
        nameCustomerEn: orders[i].nameCustomerEn,
        nameRestaurantTh: orders[i].nameRestaurantTh,
        nameRestaurantEn: orders[i].nameRestaurantEn
      };
    }
    return orders;
  } catch (err) {
    throw err;
  }
};

orderService.findOrderWithStatusPagination = async ({
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
  direction,
  pageSize,
  page
}) => {
  try {
    let orders = await orderModel.findOrderWithStatusPagination({
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
      direction,
      pageSize,
      page
    });

    orders = changeCase.objInArrCamel(orders);
    return orders;
  } catch (err) {
    throw err;
  }
};

orderService.getAmountOrderWithStatus = async ({
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
    let totalAmount = await orderModel.getAmountOrderWithStatus({
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
    });
    totalAmount = changeCase.objInArrCamel(totalAmount);
    return totalAmount[0].orderTotal;
  } catch (err) {
    throw err;
  }
};

orderService.findNewOrderWithStatusMany = async ({
  customerId,
  currentTimestamp
}) => {
  let newOrders = await orderModel.findNewOrderWithStatusMany({
    customerId,
    createTime: changeCase.dateToTimestamp(currentTimestamp),
    arrStatusId: [1, 2, 3, 4, 5]
  });
  newOrders = changeCase.objInArrCamel(newOrders);

  let currentOrders = await orderModel.findCurrentOrderWithStatusMany({
    customerId,
    createTime: changeCase.dateToTimestamp(currentTimestamp),
    arrStatusId: [1, 2, 3, 4, 5, 6, 7, 8]
  });
  currentOrders = changeCase.objInArrCamel(currentOrders);
  const newCurrentOrders = [];
  for (const [i, order] of currentOrders.entries()) {
    newCurrentOrders.push({
      orderId: order.orderId,
      status: {
        statusId: order.statusId,
        statusTime: changeCase.timestampToShowedDate(currentOrders[i].statusTime),
        nameCustomerTh: order.nameCustomerTh,
        nameCustomerEn: order.nameCustomerEn,
        nameRestaurantTh: order.nameRestaurantTh,
        nameRestaurantEn: order.nameRestaurantEn,
        descriptionTh: order.descriptionTh,
        descriptionEn: order.descriptionEn
      }
    });
  }
  return {
    newOrders,
    newCurrentOrders
  };
};

orderService.findNewOrderWithStatus = async ({
  customerId,
  currentTimestamp,
  arrStatusId,
  orderBy
}) => {
  let newOrders = await orderModel.findNewOrderWithStatusMany({
    customerId,
    createTime: changeCase.dateToTimestamp(currentTimestamp),
    arrStatusId,
    orderBy
  });
  newOrders = changeCase.objInArrCamel(newOrders);

  return newOrders;
};

orderService.findCurrentOrderWithStatus = async ({
  customerId,
  currentTimestamp
}) => {
  let currentOrders = await orderModel.findCurrentOrderWithStatusMany({
    customerId,
    createTime: changeCase.dateToTimestamp(currentTimestamp),
    arrStatusId: [1, 2, 3, 4, 5]
  });
  currentOrders = changeCase.objInArrCamel(currentOrders);

  const newCurrentOrders = [];
  for (const [i, order] of currentOrders.entries()) {
    newCurrentOrders.push({
      orderId: order.orderId,
      status: {
        statusId: order.statusId,
        time: changeCase.timestampToShowedDate(currentOrders[i].statusTime),
        nameCustomerTh: order.nameCustomerTh,
        nameCustomerEn: order.nameCustomerEn,
        nameRestaurantTh: order.nameRestaurantTh,
        nameRestaurantEn: order.nameRestaurantEn,
        descriptionTh: order.descriptionTh,
        descriptionEn: order.descriptionEn
      }
    });
  }
  return newCurrentOrders;
};

orderService.categorizeCurrentOrderToStage = async (orders) => {
  try {
    const second = [];
    const third = [];
    const fourth = [];

    for (const order of orders) {
      if (parseInt(order.status.statusId, 10) === 2) {
        second.push(order);
      } else if (parseInt(order.status.statusId, 10) === 3) {
        third.push(order);
      } else if (parseInt(order.status.statusId, 10) === 4 || parseInt(order.status.statusId, 10) === 5) {
        fourth.push(order);
      }
    }

    return {
      second,
      third,
      fourth
    };
  } catch (err) {
    throw err;
  }
};

orderService.addSlipImageInOrder = async (orders) => {
  try {
    for (const [i, order] of orders.entries()) {
      const fileExists = await gcs.isExists({
        file: `slip_${order.orderId}.png`,
        arrFolderName: ['products']
      });

      if (fileExists) {
        orders[i].slipImage = await gcs.getSignedUrl({
          file: `slip_${order.orderId}.png`,
          arrFolderName: ['slips'],
          hours: 2
        });
      }
    }
    return orders;
  } catch (err) {
    throw err;
  }
};

export default orderService;