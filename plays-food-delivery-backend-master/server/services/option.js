import path from 'path';
import optionModel from '../models/option';
import changeCase from '../../utils/changeCase';
import choiceModel from '../models/choice';

const optionService = {};

optionService.findOptionByProduct = async ({
  productId,
  productNameTh,
  productNameEn
}) => {
  try {
    let arrOption = await optionModel.findOptionByProduct({
      productId,
      productNameTh,
      productNameEn
    });

    arrOption = changeCase.objInArrCamel(arrOption);
    return arrOption;
  } catch (err) {
    throw err;
  }
};

optionService.getChoiceInOption = async (arrOption) => {
  try {
    const arrOptionChoice = [];
    for (const option of arrOption) {
      let arrChoiceInOption = await choiceModel.findChoiceByOption({
        optionId: option.optionId
      });
      arrChoiceInOption = changeCase.objInArrCamel(arrChoiceInOption);
      const options = {
        optionId: arrChoiceInOption[0].optionId,
        nameTh: arrChoiceInOption[0].optionNameTh,
        nameEn: arrChoiceInOption[0].optionNameEn,
        descriptionTh: arrChoiceInOption[0].optionDescriptionTh,
        descriptionEn: arrChoiceInOption[0].optionDescriptionEn,
        isRequired: arrChoiceInOption[0].optionIsRequired,
        choices: []
      };

      for (const choice of arrChoiceInOption) {
        options.choices.push({
          choiceId: choice.choiceId,
          nameTh: choice.choiceNameTh,
          nameEn: choice.choiceNameEn,
          price: parseFloat(choice.choicePrice)
        });
      }
      arrOptionChoice.push(options);
    }
    return arrOptionChoice;
  } catch (err) {
    throw err;
  }
};

export default optionService;