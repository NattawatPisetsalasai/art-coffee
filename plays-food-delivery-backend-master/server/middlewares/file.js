import proxy from 'express-http-proxy';

const file = {};

file.getFileFromGcStorage = async (req, res, next) => {
  try {
    const secretedKey = req.params.secretedKey;
    // create proxypass
  } catch (err) {
    next(err);
  }
};