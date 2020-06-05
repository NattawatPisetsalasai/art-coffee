import { validationResult } from 'express-validator';
import boom from '@hapi/boom';
import addressService from '../services/address';
import customerService from '../services/customer';

const addressController = {};

addressController.getDeliveryCostByAddress = async (req, res, next) => {
  try {
    const {
      latitude,
      longitude,
    } = req.query;

    console.log('get delivery cost by address');

    const deliveryCost = parseFloat('20.00');

    const result = {
      latitude,
      longitude,
      deliveryCost
    };

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

addressController.fetch = async (req, res, next) => {
  try {
    const customerId = req.user.id;
    let address = await addressService.findMany({
      customerId,
      isDeleted: false
    });
    address = await addressService.addDefaultAddress({
      addresses: address,
      customerId
    });
    res.status(200).send(address);
  } catch (err) {
    next(err);
  }
};

addressController.insert = async (req, res, next) => {
  try {
    const customerId = req.user.id;
    const {
      name,
      addressLine,
      province,
      district,
      subDistrict,
      postalCode,
      latitude,
      longitude,
      comment,
      isDefault
    } = req.body;
    const address = await addressService.insertOne({
      customerId,
      name,
      addressLine,
      province,
      district,
      subDistrict,
      postalCode,
      latitude,
      longitude,
      comment
    });

    // If first address setting to default
    const findedAddress = await addressService.findMany({
      customerId
    });

    if (findedAddress.length === 0 || isDefault) {
      const customer = await customerService.updateOne({
        customerId,
        defaultShipping: address.addressId
      });
    }
    res.status(200).send(address);
  } catch (err) {
    next(err);
  }
};

addressController.delete = async (req, res, next) => {
  try {
    const { addressId } = req.query;
    const address = await addressService.updateOne({
      addressId,
      isDeleted: true
    });
    res.status(200).send(address);
  } catch (err) {
    next(err);
  }
};

addressController.edit = async (req, res, next) => {
  try {
    const {
      addressId,
      name,
      addressLine,
      province,
      district,
      subDistrict,
      postalCode,
      latitude,
      longitude,
      comment,
      isDefault
    } = req.body;
    const customerId = req.user.id;

    const address = await addressService.updateOne({
      addressId,
      name,
      addressLine,
      province,
      district,
      subDistrict,
      postalCode,
      latitude,
      longitude,
      comment
    });

    if (isDefault) {
      const customer = await customerService.updateOne({
        customerId,
        defaultShipping: address.addressId
      });
    }

    res.status(200).send(address);
  } catch (err) {
    next(err);
  }
};

addressController.setDefault = async (req, res, next) => {
  try {
    const customerId = req.user.id;
    const { addressId } = req.body;
    const customer = await customerService.updateOne({
      customerId,
      defaultShipping: addressId
    });
    res.status(200).send(customer);
  } catch (err) {
    next(err);
  }
};

export default addressController;