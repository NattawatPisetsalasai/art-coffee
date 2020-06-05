import boom from '@hapi/boom';
import { logErrStack } from '../../utils/logger';

const errorHandle = (err, req, res, next) => {
  if (err.isBoom) {
    if (err.data) {
      res.status(err.output.statusCode).json(err.data);
    } else {
      res.status(err.output.statusCode).json(err.output.payload);
    }
  } else if (err.isServer) {
    logErrStack(err);
    err.output.payload.message = err.message;
    res.status(err.output.statusCode).json(err.output.payload);
  } else {
    logErrStack(err);
    const message = err.message;
    let newErr;
    switch (err.code) {
      case '23505':
        newErr = boom.badRequest(message);
        break;
      default:
        newErr = boom.badImplementation(message);
    }
    const errors = {
      errors: []
    };
    newErr.output.payload.message = message;
    errors.errors.push(newErr.output.payload);
    res.status(newErr.output.statusCode).json(errors);
  }
};

export default errorHandle;
