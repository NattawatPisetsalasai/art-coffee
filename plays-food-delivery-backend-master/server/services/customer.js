import customerModel from '../models/customer';
import changeCase from '../../utils/changeCase';


const customerService = {};

customerService.findOne = async ({
  customerId,
  username,
  firstname,
  lastname,
  phone,
  email,
  facebookId,
  googleId,
  point,
  defaultBillingAddr,
  defaultShipping,
  isDeleted
}) => {
  try {
    let customer = await customerModel.findOne({
      customerId,
      username,
      firstname,
      lastname,
      phone,
      email,
      facebookId,
      googleId,
      point,
      defaultBillingAddr,
      defaultShipping,
      isDeleted
    });

    customer = changeCase.objCamel(customer[0]);
    return customer;
  } catch (err) {
    throw err;
  }
};

customerService.isExists = async ({
  customerId,
  username,
  firstname,
  lastname,
  phone,
  email,
  facebookId,
  googleId,
  point,
  defaultBillingAddr,
  defaultShipping,
  isDeleted
}) => {
  try {
    const customer = await customerModel.findOne({
      customerId,
      username,
      firstname,
      lastname,
      phone,
      email,
      facebookId,
      googleId,
      point,
      defaultBillingAddr,
      defaultShipping,
      isDeleted
    });

    if (customer.length) {
      return true;
    }

    return false;
  } catch (err) {
    throw err;
  }
};

customerService.insertOne = async ({
  email,
  username,
  password,
  firstname,
  lastname,
  phone,
  facebookId,
  googleId,
  point
}) => {
  try {
    let customer = await customerModel.insertOne({
      email,
      username,
      password,
      firstname,
      lastname,
      phone,
      facebookId,
      googleId,
      point
    });

    customer = changeCase.objCamel(customer[0]);

    return customer;
  } catch (err) {
    throw err;
  }
};

customerService.updateOne = async ({
  customerId,
  username,
  password,
  firstname,
  lastname,
  phone,
  email,
  facebookId,
  googleId,
  point,
  defaultBillingAddr,
  defaultShipping,
  isDeleted
}) => {
  try {
    let customer = await customerModel.updateOne({
      customerId,
      username,
      password,
      firstname,
      lastname,
      phone,
      email,
      facebookId,
      googleId,
      point,
      defaultBillingAddr,
      defaultShipping,
      isDeleted
    });
    customer = changeCase.objCamel(customer[0]);
    return customer;
  } catch (err) {
    throw err;
  }
};

export default customerService;