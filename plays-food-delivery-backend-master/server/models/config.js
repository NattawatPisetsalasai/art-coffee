import db from '../db';

const configModel = {};

configModel.fecth = async () => {
  try {
    return await db.query(
      'SELECT * FROM config'
    );
  } catch (err) {
    throw err;
  }
};

configModel.findByCategory = async ({
  category
}) => {
  try {
    return await db.query(
      'SELECT * FROM config WHERE'
        + ' TRUE'
        + ` and ${category ? `category = '${category}'` : ' TRUE'}`
    );
  } catch (err) {
    throw err;
  }
};

configModel.findOne = async ({
  key,
  category
}) => {
  try {
    return await db.query(
      'SELECT * FROM config WHERE'
        + ' TRUE'
        + ` and ${key ? `"key" = '${key}'` : ' TRUE'}`
        + ` and ${category ? `category = '${category}'` : ' TRUE'}`
        + ` and ${!!(key || category)}`
        + ' limit 1'
    );
  } catch (err) {
    throw err;
  }
};

export default configModel;