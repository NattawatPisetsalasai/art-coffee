import db from '../db';

const choiceModel = {};

choiceModel.findChoiceByOption = async ({
  optionId,
  optionNameTh,
  optionNameEn
}) => {
  try {
    return await db.query(
      'SELECT'
        + ' options.option_id as option_id,'
        + ' options.name_th as option_name_th,'
        + ' options.name_en as option_name_en,'
        + ' options.description_th as option_description_th,'
        + ' options.description_en as option_description_en,'
        + ' options.is_required as option_is_required,'
        + ' choices.choice_id as choice_id,'
        + ' choices.name_th as choice_name_th,'
        + ' choices.name_en as choice_name_en,'
        + ' choices.price as choice_price'
        + ' from options'
        + ' inner join option_choices on options.option_id = option_choices.option_id'
        + ' inner join choices on option_choices.choice_id = choices.choice_id'
        + ' where'
        + ' options.is_deleted = false'
        + ` and ${optionId ? ` options.option_id = ${optionId}` : ' TRUE'}`
        + ` and ${optionNameTh ? ` options.name_th = '${optionNameTh}'` : ' TRUE'}`
        + ` and ${optionNameEn ? ` options.name_en = '${optionNameEn}'` : ' TRUE'}`
    );
  } catch (err) {
    throw err;
  }
};

choiceModel.findOne = async ({
  choiceId,
  nameTh,
  nameEn,
  price,
  isDeleted
}) => {
  try {
    return await db.query(
      'SELECT * FROM choices WHERE'
        + ' TRUE'
        + ` and ${choiceId ? `choice_id = ${choiceId}` : ' TRUE'}`
        + ` and ${nameTh ? `name_th = '${nameTh}'` : ' TRUE'}`
        + ` and ${nameEn ? `name_en = '${nameEn}'` : ' TRUE'}`
        + ` and ${price ? `price = ${price}` : ' TRUE'}`
        + ` and ${[true, false].includes(isDeleted) && isDeleted.toString() ? ` "is_deleted" = ${isDeleted}` : ' TRUE'}`
        + ` and ${!!(choiceId || nameTh || nameEn || price || isDeleted)}`
        + ' limit 1'
    );
  } catch (err) {
    throw err;
  }
};

export default choiceModel;