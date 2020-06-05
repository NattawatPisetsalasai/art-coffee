import db from '../db';

const orderItemChoiceModel = {};

orderItemChoiceModel.insertOne = async ({
  itemId,
  optionId,
  choiceId
}) => {
  try {
    return await db.query(
      'INSERT INTO order_item_choice'
        + ' ('
        + ' item_id'
        + `${optionId ? ', option_id' : ''}`
        + `${choiceId ? ', choice_id' : ''}`
        + ' ) VALUES ('
        + `${itemId}`
        + `${optionId ? `, ${optionId}` : ''}`
        + `${choiceId ? `, ${choiceId}` : ''}`
        + ') RETURNING *'
    );
  } catch (err) {
    throw err;
  }
};

orderItemChoiceModel.findMany = async ({
  itemId,
  optionId,
  choiceId
}) => {
  try {
    return await db.query(
      'SELECT * FROM order_item_choice WHERE'
        + ' TRUE'
        + ` and ${itemId ? `"item_id" = ${itemId}` : ' TRUE'}`
        + ` and ${optionId ? `"option_id" = ${optionId}` : ' TRUE'}`
        + ` and ${choiceId ? `"choice_id" = ${choiceId}` : ' TRUE'}`
        + ` and ${!!(itemId || optionId || choiceId)}`
    );
  } catch (err) {
    throw err;
  }
};

export default orderItemChoiceModel;