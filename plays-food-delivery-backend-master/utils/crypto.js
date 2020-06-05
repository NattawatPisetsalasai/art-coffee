import config from 'config';
import crypto from 'crypto';

// const config = require('config');
// const crypto = require('crypto');

const cryptoService = {};

cryptoService.decryptMessage = (encryptData) => {
  const algorithm = config.get('cryptoMessage.algorithm');
  const password = config.get('cryptoMessage.password');
  const key = crypto.scryptSync(password, 'salt', 24);
  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const inputDecoding = config.get('cryptoMessage.inputDecoding');
  const outputDecoding = config.get('cryptoMessage.outputDecoding');
  let decrypted = decipher.update(encryptData, inputDecoding, outputDecoding);
  //   decipher.setAutoPadding(false);
  decrypted += decipher.final(outputDecoding);
  //   const decryptObj = JSON.parse(decrypted);
  return decrypted;
};

cryptoService.encryptMessage = (message) => {
  const algorithm = config.get('cryptoMessage.algorithm');
  const password = config.get('cryptoMessage.password');
  const key = crypto.scryptSync(password, 'salt', 24);
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const inputEncoding = config.get('cryptoMessage.inputEncoding');
  const outputEncoding = config.get('cryptoMessage.outputEncoding');
  let encrypted = cipher.update(message, inputEncoding, outputEncoding);
  encrypted += cipher.final(outputEncoding);
  return encrypted;
};

cryptoService.hashMessage = (msg) => {
  const hash = crypto.createHash('sha256');
  hash.update(msg);
  return hash.digest('hex');
};

// const text = cryptoService.hashMessage('ximpler');
// console.log('text: ', text);

// const encrypt = cryptoService.encryptMessage('{ "hostIp": "127.0.0.1", "port": "4725", "username": "username_1" }');
// const decrypt = cryptoService.decryptMessage(encrypt);
// console.log('decrypt : ', decrypt);
// console.log('encrypt : ', encrypt);

export default cryptoService;