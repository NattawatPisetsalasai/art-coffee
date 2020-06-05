import { config } from 'dotenv';
import configModel from '../server/models/configModel';

config();

const generateFile = {};

generateFile.createGcStorageConfig = async () => {
  try {
    const allConfig = await configModel.findByCategory({
      category: 'gcs'
    });

    const objConfig = {};
    allConfig.forEach((configField) => {
      objConfig[configField.key] = configField.value;
    });
  } catch (err) {
    throw err;
  }
};

generateFile.test = async () => {

};

module.exports = { generateFile };