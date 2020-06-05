import {
  format, transports, loggers
} from 'winston';
import path from 'path';
import errorStackParser from 'error-stack-parser';
import chalk from 'chalk';

loggers.add('logInfo', {
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${chalk.blue(info.timestamp)} | [${info.level}] ${chalk.yellow(info.message)}`),
  ),
  transports: [new transports.Console()]
});

loggers.add('logError', {
  level: 'error',
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.label({
      label: process.mainModule.filename.split(path.sep).slice(-2).join(path.sep)
    }),
    format.printf(info => `${chalk.blue(info.timestamp)} | [${info.level}] ${chalk.yellow(info.message)}}`),
  ),
  transports: [new transports.Console()]
});

loggers.add('logFixed', {
  level: 'error',
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.label({
      label: process.mainModule.filename.split(path.sep).slice(-2).join(path.sep)
    }),
    format.printf(info => `${chalk.blue(info.timestamp)} | [${chalk.magenta('fixed')}] ${chalk.yellow(info.message)}`),
  ),
  transports: [new transports.Console()]
});

const logErr = loggers.get('logError');
const logInfo = loggers.get('logInfo');
const logFixed = loggers.get('logFixed');

const logErrStack = (err) => {
  const arrErr = errorStackParser.parse(err);
  logInfo.error(err.message);
  logInfo.error(err.code);
  for (const errLine of arrErr) {
    const col = errLine.columnNumber;
    const line = errLine.lineNumber;
    const fileName = errLine.fileName;
    const funcName = errLine.functionName;
    console.log(`  ${chalk.red('at')} line : ${chalk.yellow(line)} | col : ${chalk.yellow(col)} | functionName : ${chalk.green(funcName)}`);
    console.log(`     path : ${chalk.magenta(fileName.split(path.sep).slice(-4).join(path.sep))}`);
  }
  console.log('-------------------------------------------------------------------------');
};

const logComponent = (topic, arrKey, arrValue) => {
  try {
    if (arrKey.length === arrValue.length) {
      let result = topic;
      for (let i = 0; i < arrKey.length; i += 1) {
        result = result.concat(` | ${chalk.red(arrKey[i])}: ${chalk.green(arrValue[i])}`);
      }
      logInfo.info(result);
    } else {
      throw new Error('Array component key and value not equal');
    }
  } catch (err) {
    throw (err);
  }
};


export {
  logErr, logInfo, logFixed, logErrStack, logComponent
};