import { validationResult } from 'express-validator';
import boom from '@hapi/boom';
import orderService from '../services/order';
import changeCase from '../../utils/changeCase';
import gcs from '../../utils/gcs/gcs';
import orderModel from '../models/order';

const orderController = {};

orderController.createOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw boom.badRequest('invalid input', { errors: errors.array() });
    }

    const {
      shippingAddressId,
      branchId,
      isPickup,
      pickupAppointTime,
      products
    } = req.body;

    const customerId = req.user.id;

    const orderHistory = await orderService.createOrder({
      customerId,
      shippingAddressId,
      branchId,
      isPickup,
      pickupAppointTime,
      products
    });
    res.status(200).send(orderHistory);
  } catch (err) {
    next(err);
  }
};

orderController.getActiveOrder = async (req, res, next) => {
  try {
    const customerId = req.user.id;

    let orders = await orderService.findActiveOne({
      customerId
    });

    const now = changeCase.dateToTimestamp(Date.now());
    orders = await orderService.groupOrderActive(orders);
    orders = await orderService.addItemInOrder(orders);

    res.status(200).send({
      now,
      orders
    });
  } catch (err) {
    next(err);
  }
};

orderController.getOrderHistory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw boom.badRequest('invalid input', { errors: errors.array() });
    }

    const { page, pageSize } = req.query;
    const customerId = req.user.id;

    let orders = await orderService.findOrderWithStatusPagination({
      customerId,
      arrStatusId: [4, 5],
      page: page - 1,
      pageSize: pageSize || 5,
      direction: 'DESC'
    });
    orders = await orderService.groupOrderActive(orders);
    orders = await orderService.addItemInOrder(orders);
    const amount = await orderService.getAmountOrderWithStatus({
      customerId,
      arrStatusId: [4, 5]
    });
    const result = {
      orders,
      amount: parseInt(amount, 10)
    };

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

orderController.getChangedActiveOrder = async (req, res, next) => {
  try {
    const customerId = req.user.id;
    const { currentTimestamp } = req.query;
    const now = changeCase.dateToTimestamp(Date.now());

    let newOrders = await orderService.findNewOrderWithStatus({
      customerId,
      currentTimestamp,
      arrStatusId: [1, 2, 3]
    });

    const newCurrentOrders = await orderService.findCurrentOrderWithStatus({
      customerId,
      currentTimestamp
    });

    newOrders = await orderService.groupOrderActive(newOrders);
    newOrders = await orderService.addItemInOrder(newOrders);

    res.status(200).send({
      newOrders,
      newCurrentOrders,
      now
    });
  } catch (err) {
    next(err);
  }
};

orderController.changeOrderStatus = async (req, res, next) => {
  try {
    const {
      orderId,
      stage,
      nextStatusId
    } = req.body;

    const role = req.user.role;
    const id = req.user.id;

    let updatedStatus = '';

    if (await orderService.checkInsertStatusValid({
      orderId,
      statusId: nextStatusId
    })) {
      updatedStatus = await orderService.insertNextStatus({
        orderId,
        statusId: nextStatusId
      });
    } else {
      throw boom.badRequest("Can't update status backward");
    }

    res.status(200).send(updatedStatus);
  } catch (err) {
    next(err);
  }
};

orderController.getOrderAllStage = async (req, res, next) => {
  try {
    const now = changeCase.dateToTimestamp(Date.now());
    let first = await orderService.findOrderByStatus([1]);
    first = await orderService.getCustomerInfoByOrder(first);
    first = await orderService.addItemInOrder(first);
    first = await orderService.addSlipImageInOrder(first);
    first = changeCase.deleteFieldObjInArr([
      'nowTimestamp',
      'customerId',
      'addressId',
      'statusTime',
      'nameCustomerTh',
      'nameCustomerEn',
      'nameRestaurantTh',
      'nameRestaurantEn',
      'descriptionTh',
      'descriptionEn'
    ], first);

    let second = await orderService.findOrderByStatus([2]);
    second = await orderService.getCustomerInfoByOrder(second);
    second = await orderService.addItemInOrder(second);
    second = await orderService.addSlipImageInOrder(second);
    second = changeCase.deleteFieldObjInArr([
      'nowTimestamp',
      'customerId',
      'addressId',
      'statusTime',
      'nameCustomerTh',
      'nameCustomerEn',
      'nameRestaurantTh',
      'nameRestaurantEn',
      'descriptionTh',
      'descriptionEn'
    ], second);

    let third = await orderService.findOrderByStatus([3]);
    third = await orderService.getCustomerInfoByOrder(third);
    third = await orderService.addItemInOrder(third);
    third = await orderService.addSlipImageInOrder(third);
    third = changeCase.deleteFieldObjInArr([
      'nowTimestamp',
      'customerId',
      'addressId',
      'statusTime',
      'nameCustomerTh',
      'nameCustomerEn',
      'nameRestaurantTh',
      'nameRestaurantEn',
      'descriptionTh',
      'descriptionEn'
    ], third);

    let fourth = await orderService.findOrderByStatus([4, 5]);
    fourth = await orderService.getCustomerInfoByOrder(fourth);
    fourth = await orderService.addItemInOrder(fourth);
    fourth = await orderService.addSlipImageInOrder(fourth);
    fourth = changeCase.deleteFieldObjInArr([
      'nowTimestamp',
      'customerId',
      'addressId',
      'statusTime',
      'nameCustomerTh',
      'nameCustomerEn',
      'nameRestaurantTh',
      'nameRestaurantEn',
      'descriptionTh',
      'descriptionEn'
    ], fourth);

    res.status(200).send({
      first,
      second,
      third,
      fourth,
      now
    });
  } catch (err) {
    next(err);
  }
};

orderController.getChangedOrderAllStage = async (req, res, next) => {
  try {
    const { currentTimestamp } = req.query;
    const now = changeCase.dateToTimestamp(Date.now());
    let newOrders = await orderService.findNewOrderWithStatus({
      currentTimestamp,
      arrStatusId: [1],
      orderBy: 'ASC'
    });

    newOrders = await orderService.getCustomerInfoByOrder(newOrders);
    newOrders = await orderService.addItemInOrder(newOrders);
    newOrders = await orderService.addSlipImageInOrder(newOrders);
    newOrders = changeCase.deleteFieldObjInArr([
      'nowTimestamp',
      'customerId',
      'addressId',
      'statusTime',
      'nameCustomerTh',
      'nameCustomerEn',
      'nameRestaurantTh',
      'nameRestaurantEn',
      'descriptionTh',
      'descriptionEn'
    ], newOrders);

    const newCurrentOrders = await orderService.findCurrentOrderWithStatus({
      currentTimestamp,
      arrStatusId: [2, 3, 4, 5]
    });

    const {
      second, third, fourth
    } = await orderService.categorizeCurrentOrderToStage(newCurrentOrders);

    res.status(200).send({
      first: newOrders,
      second,
      third,
      fourth,
      now
    });
  } catch (err) {
    next(err);
  }
};

orderController.uploadOrderSlip = async (req, res, next) => {
  try {
    const files = req.files;
    const file = files.slip[0];
    const { orderId } = req.body;
    file.originalname = `slip_${orderId}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`;
    await gcs.uploadFile({
      file,
      arrFolderName: ['slips']
    });

    const imageUrl = await gcs.getSignedUrl({
      file: `slip_${orderId}.png`,
      arrFolderName: ['slips'],
      hours: 2
    });

    res.status(200).send({
      message: 'Upload was successful',
      imageUrl
    });
  } catch (err) {
    next(err);
  }
};

export default orderController;