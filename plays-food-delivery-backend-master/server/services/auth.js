import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import configModel from '../models/config';
import customerModel from '../models/customer';
import changeCase from '../../utils/changeCase';

config();

const authService = {};

authService.genToken = async ({
  customerId,
  restuarantId
}) => {
  try {
    const accessPayload = {
      type: 'access',
      id: `${customerId || restuarantId}`,
      role: `${customerId ? 'customer' : 'restuarant'}`
    };
    const refreshPayload = {
      type: 'refresh',
      id: `${customerId || restuarantId}`,
      role: `${customerId ? 'customer' : 'restuarant'}`
    };

    const configObj = await configModel.findOne({
      key: 'secretKey',
      category: 'auth'
    });
    const accessToken = jwt.sign(accessPayload, process.env.JWT_SECRET, { expiresIn: 120 });
    const refreshToken = jwt.sign(refreshPayload, process.env.JWT_SECRET, { expiresIn: 3600 * 24 });
    return { accessToken, refreshToken };
  } catch (err) {
    throw err;
  }
};

authService.genAccessToken = async ({
  customerId,
  restuarantId
}) => {
  try {
    const accessPayload = {
      type: 'access',
      id: `${customerId || restuarantId}`,
      role: `${customerId ? 'customer' : 'restuarant'}`
    };

    const accessToken = jwt.sign(accessPayload, process.env.JWT_SECRET, { expiresIn: 120 });
    return { accessToken };
  } catch (err) {
    throw err;
  }
};

export default authService;