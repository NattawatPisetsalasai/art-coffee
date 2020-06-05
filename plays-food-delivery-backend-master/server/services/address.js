import changeCase from '../../utils/changeCase';
import addressModel from '../models/address';
import customerModel from '../models/customer';


const addressService = {};

addressService.insertOne = async ({
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
}) => {
  try {
    let address = await addressModel.insertOne({
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

    address = changeCase.objCamel(address[0]);
    return address;
  } catch (err) {
    throw err;
  }
};

addressService.findOne = async ({
  addressId,
  customerId,
  name,
  addressLine,
  province,
  district,
  subDistrict,
  postalCode,
  latitude,
  longitude,
  comment,
  isDeleted
}) => {
  try {
    let address = await addressModel.findOne({
      addressId,
      customerId,
      name,
      addressLine,
      province,
      district,
      subDistrict,
      postalCode,
      latitude,
      longitude,
      comment,
      isDeleted
    });

    address = changeCase.objCamel(address[0]);
    return address;
  } catch (err) {
    throw err;
  }
};

addressService.findMany = async ({
  addressId,
  customerId,
  name,
  addressLine,
  province,
  district,
  subDistrict,
  postalCode,
  latitude,
  longitude,
  comment,
  isDeleted
}) => {
  try {
    let address = await addressModel.findMany({
      addressId,
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

    address = changeCase.objInArrCamel(address);
    return address;
  } catch (err) {
    throw err;
  }
};

addressService.updateOne = async ({
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
  isDeleted
}) => {
  try {
    let address = await addressModel.updateOne({
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
      isDeleted
    });

    address = changeCase.objCamel(address[0]);
    return address;
  } catch (err) {
    throw err;
  }
};

addressService.deleteOne = async (addressId) => {
  try {
    let address = await addressModel.deleteOne(addressId);

    address = changeCase.objCamel(address[0]);
    return address;
  } catch (err) {
    throw err;
  }
};

addressService.addDefaultAddress = async ({
  customerId,
  addresses
}) => {
  try {
    let customer = await customerModel.findOne({
      customerId
    });
    customer = changeCase.objCamel(customer[0]);
    for (const [i, address] of addresses.entries()) {
      if (address.addressId === customer.defaultShipping) {
        addresses[i].isDefault = true;
      }
    }
    return addresses;
  } catch (err) {
    throw err;
  }
};

export default addressService;