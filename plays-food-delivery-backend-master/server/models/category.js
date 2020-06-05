import changeCase from '../../utils/changeCase';
import db from '../db';

const categoryModel = {};

categoryModel.fetch = async () => {
  try {
    return await db.query(
      'SELECT * FROM categories'
    );
  } catch (err) {
    throw err;
  }
};

export default categoryModel;