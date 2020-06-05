import db from '../db';

const addressModel = {};

addressModel.fecth = async () => {
  try {
    return await db.query(
      'SELECT * FROM address'
    );
  } catch (err) {
    throw err;
  }
};

addressModel.findOne = async ({
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
    return await db.query(
      'SELECT * FROM address WHERE'
            + ' TRUE'
            + ` and ${addressId ? `"address_id" = ${addressId}` : ' TRUE'}`
            + ` and ${customerId ? `"customer_id" = ${customerId}` : ' TRUE'}`
            + ` and ${name ? `"name" = '${name}'` : ' TRUE'}`
            + ` and ${addressLine ? `"address_line" = '${addressLine}'` : ' TRUE'}`
            + ` and ${province ? `"province" = '${province}'` : ' TRUE'}`
            + ` and ${district ? `"district" = '${district}'` : ' TRUE'}`
            + ` and ${subDistrict ? `"sub_district" = '${subDistrict}'` : ' TRUE'}`
            + ` and ${postalCode ? `"postal_code" = '${postalCode}'` : ' TRUE'}`
            + ` and ${latitude ? `"latitude" = '${latitude}'` : ' TRUE'}`
            + ` and ${longitude ? `"longitude" = ${longitude}` : ' TRUE'}`
            + ` and ${comment ? `"comment" = '${comment}'` : ' TRUE'}`
            + ` and ${[true, false].includes(isDeleted) && isDeleted.toString() ? `is_deleted = ${isDeleted}` : ' TRUE'}`
            + ` and ${!!(addressId || customerId || name || addressLine || province || district || subDistrict || postalCode || latitude || longitude || commen || isDeleted)}`
            + ' limit 1'
    );
  } catch (err) {
    throw err;
  }
};

addressModel.findMany = async ({
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
    return await db.query(
      'SELECT * FROM address WHERE'
            + ' TRUE'
            + ` and ${addressId ? `"address_id" = ${addressId}` : ' TRUE'}`
            + ` and ${customerId ? `"customer_id" = ${customerId}` : ' TRUE'}`
            + ` and ${name ? `"name" = '${name}'` : ' TRUE'}`
            + ` and ${addressLine ? `"address_line" = '${addressLine}'` : ' TRUE'}`
            + ` and ${province ? `"province" = '${province}'` : ' TRUE'}`
            + ` and ${district ? `"district" = '${district}'` : ' TRUE'}`
            + ` and ${subDistrict ? `"sub_district" = '${subDistrict}'` : ' TRUE'}`
            + ` and ${postalCode ? `"postal_code" = '${postalCode}'` : ' TRUE'}`
            + ` and ${latitude ? `"latitude" = '${latitude}'` : ' TRUE'}`
            + ` and ${longitude ? `"longitude" = ${longitude}` : ' TRUE'}`
            + ` and ${comment ? `"comment" = '${comment}'` : ' TRUE'}`
            + ` and ${[true, false].includes(isDeleted) && isDeleted.toString() ? `is_deleted = ${isDeleted}` : ' TRUE'}`
            + ` and ${!!(addressId || customerId || name || addressLine || province || district || subDistrict || postalCode || latitude || longitude || comment || isDeleted)}`
    );
  } catch (err) {
    throw err;
  }
};

addressModel.insertOne = async ({
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
    return await db.query(
      'INSERT INTO address'
        + ' ('
        + `${customerId ? ' customer_id' : ''}`
        + `${name ? ', name' : ''}`
        + `${addressLine ? ', address_line' : ''}`
        + `${province ? ', province' : ''}`
        + `${district ? ', district' : ''}`
        + `${subDistrict ? ', sub_district' : ''}`
        + `${postalCode ? ', postal_code' : ''}`
        + `${latitude ? ', latitude' : ''}`
        + `${longitude ? ', longitude' : ''}`
        + `${comment ? ', comment' : ''}`
        + ' ) VALUES ('
        + `${customerId}`
        + `${name ? `, '${name}'` : ''}`
        + `${addressLine ? `, '${addressLine}'` : ''}`
        + `${province ? `, '${province}'` : ''}`
        + `${district ? `, '${district}'` : ''}`
        + `${subDistrict ? `, '${subDistrict}'` : ''}`
        + `${postalCode ? `, '${postalCode}'` : ''}`
        + `${latitude ? `, '${latitude}'` : ''}`
        + `${longitude ? `, '${longitude}'` : ''}`
        + `${comment ? `, '${comment}'` : ''}`
        + ') RETURNING *'
    );
  } catch (err) {
    throw err;
  }
};

addressModel.updateOne = async ({
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
    return await db.query(
      'UPDATE address SET'
          + ' ('
          + ' address_id'
          + `${name ? ', name' : ''}`
          + `${addressLine ? ', address_line' : ''}`
          + `${province ? ', province' : ''}`
          + `${district ? ', district' : ''}`
          + `${subDistrict ? ', sub_district' : ''}`
          + `${postalCode ? ', postal_code' : ''}`
          + `${latitude ? ', latitude' : ''}`
          + `${longitude ? ', longitude' : ''}`
          + `${comment ? ', comment' : ''}`
          + `${[true, false].includes(isDeleted) && isDeleted.toString() ? ', is_deleted' : ''}`
          + ' ) = ('
          + ` ${addressId}`
          + `${name ? `, '${name}'` : ''}`
          + `${addressLine ? `, '${addressLine}'` : ''}`
          + `${province ? `, '${province}'` : ''}`
          + `${district ? `, '${district}'` : ''}`
          + `${subDistrict ? `, '${subDistrict}'` : ''}`
          + `${postalCode ? `, '${postalCode}'` : ''}`
          + `${latitude ? `, '${latitude}'` : ''}`
          + `${longitude ? `, '${longitude}'` : ''}`
          + `${comment ? `, '${comment}'` : ''}`
          + `${[true, false].includes(isDeleted) && isDeleted.toString() ? `, ${isDeleted}` : ''}`
          + `) WHERE address_id = ${addressId}`
          + ' RETURNING *'
    );
  } catch (err) {
    throw err;
  }
};

addressModel.deleteOne = async (addressId) => {
  try {
    return await db.query(
      `DELETE FROM address WHERE address_id = ${addressId} RETURNING *`
    );
  } catch (err) {
    throw err;
  }
};

export default addressModel;