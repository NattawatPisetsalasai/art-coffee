import db from '../db';

const customerModel = {};

customerModel.fecth = async () => {
  try {
    return await db.query(
      'SELECT * FROM customers'
    );
  } catch (err) {
    throw err;
  }
};

customerModel.findOne = async ({
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
    return await db.query(
      'SELECT * FROM customers WHERE'
            + ' TRUE'
            + ` and ${customerId ? `"customer_id" = ${customerId}` : ' TRUE'}`
            + ` and ${username ? `"username" = '${username}'` : ' TRUE'}`
            + ` and ${firstname ? `"firstname" = '${firstname}'` : ' TRUE'}`
            + ` and ${lastname ? `"lastname" = '${lastname}'` : ' TRUE'}`
            + ` and ${phone ? `"phone" = '${phone}'` : ' TRUE'}`
            + ` and ${email ? `"email" = '${email}'` : ' TRUE'}`
            + ` and ${facebookId ? `"facebook_id" = '${facebookId}'` : ' TRUE'}`
            + ` and ${googleId ? `"google_id" = '${googleId}'` : ' TRUE'}`
            + ` and ${point ? `"point" = ${point}` : ' TRUE'}`
            + ` and ${defaultBillingAddr ? `"default_billing_addr" = ${defaultBillingAddr}` : ' TRUE'}`
            + ` and ${defaultShipping ? `"default_shipping" = ${defaultShipping}` : ' TRUE'}`
            + ` and ${[true, false].includes(isDeleted) && isDeleted.toString() ? `"is_deleted" = ${isDeleted}` : ' TRUE'}`
            + ` and ${!!(customerId || username || firstname || lastname || phone || email || facebookId || googleId || point || defaultBillingAddr || defaultShipping)}`
            + ' limit 1'
    );
  } catch (err) {
    throw err;
  }
};

customerModel.insertOne = async ({
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
    return await db.query(
      'INSERT INTO customers'
        + ' ('
        + `${email ? ' email' : ''}`
        + `${username ? ', username' : ''}`
        + `${password ? ', password' : ''}`
        + `${firstname ? ', firstname' : ''}`
        + `${lastname ? ', lastname' : ''}`
        + `${phone ? ', phone' : ''}`
        + `${facebookId ? ', facebook_id' : ''}`
        + `${googleId ? ', google_id' : ''}`
        + `${point ? ', point' : ''}`
        + ' ) VALUES ('
        + `'${email}'`
        + `${username ? `, '${username}'` : ''}`
        + `${password ? `, '${password}'` : ''}`
        + `${firstname ? `, '${firstname}'` : ''}`
        + `${lastname ? `, '${lastname}'` : ''}`
        + `${phone ? `, '${phone}'` : ''}`
        + `${facebookId ? `, '${facebookId}'` : ''}`
        + `${googleId ? `, '${googleId}'` : ''}`
        + `${point ? `, '${point}'` : ''}`
        + ') RETURNING *'
    );
  } catch (err) {
    throw err;
  }
};

customerModel.updateOne = async ({
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
    return await db.query(
      'UPDATE customers SET'
          + ' ('
          + ' customer_id'
          + `${username ? ', username' : ''}`
          + `${password ? ', password' : ''}`
          + `${firstname ? ', firstname' : ''}`
          + `${lastname ? ', lastname' : ''}`
          + `${phone ? ', phone' : ''}`
          + `${email ? ', email' : ''}`
          + `${facebookId ? ', facebook_id' : ''}`
          + `${googleId ? ', google_id' : ''}`
          + `${point ? ', point' : ''}`
          + `${defaultBillingAddr ? ', default_billing_addr' : ''}`
          + `${defaultShipping ? ', default_shipping' : ''}`
          + `${[true, false].includes(isDeleted) && isDeleted.toString() ? ', is_deleted' : ''}`
          + ' ) = ('
          + ` ${customerId}`
          + `${username ? `, '${username}'` : ''}`
          + `${password ? `, '${password}'` : ''}`
          + `${firstname ? `, '${firstname}'` : ''}`
          + `${lastname ? `, '${lastname}'` : ''}`
          + `${phone ? `, '${phone}'` : ''}`
          + `${email ? `, '${email}'` : ''}`
          + `${facebookId ? `, '${facebookId}'` : ''}`
          + `${googleId ? `, '${googleId}'` : ''}`
          + `${point ? `, '${point}'` : ''}`
          + `${defaultBillingAddr ? `, ${defaultBillingAddr}` : ''}`
          + `${defaultShipping ? `, ${defaultShipping}` : ''}`
          + `${[true, false].includes(isDeleted) && isDeleted.toString() ? `, ${isDeleted}` : ''}`
          + `) WHERE customer_id = '${customerId}'`
          + ' RETURNING *'
    );
  } catch (err) {
    throw err;
  }
};

export default customerModel;