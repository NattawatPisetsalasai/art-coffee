import changeCase from 'change-case';
import dateFormat from 'dateformat';


const change = {};

change.objCamel = (objCamel) => {
  try {
    const newObjCamel = {};
    for (const key in objCamel) {
      if (Object.prototype.hasOwnProperty.call(objCamel, key)) {
        newObjCamel[changeCase.camelCase(key)] = objCamel[key];
      }
    }
    return newObjCamel;
  } catch (err) {
    throw err;
  }
};

change.objInArrCamel = (arrObj) => {
  try {
    const newArr = [];
    for (const obj of arrObj) {
      const newObjCamel = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          newObjCamel[changeCase.camelCase(key)] = obj[key];
        }
      }
      newArr.push(newObjCamel);
    }
    return newArr;
  } catch (err) {
    throw err;
  }
};

change.strSnake = (strSnake) => {
  try {
    return changeCase.snakeCase(strSnake);
  } catch (err) {
    throw err;
  }
};

change.deleteFieldObjInArr = (arrDeletedField, arrObj) => {
  try {
    for (const obj of arrObj) {
      for (const deletedField of arrDeletedField) {
        if (deletedField in obj) {
          delete obj[deletedField];
        }
      }
    }
    return arrObj;
  } catch (err) {
    throw err;
  }
};

change.dateToTimestamp = (date) => {
  try {
    // let timestamp = dateFormat(date);
    // timestamp = timestamp.split(' ');
    // timestamp = `${timestamp[3]}-${timestamp[1]}-${timestamp[2]} ${timestamp[4]}`;
    // return timestamp;
    return dateFormat(date, 'yyyy-mm-dd H:MM:ss');
  } catch (err) {
    throw err;
  }
};

change.timestampToShowedDate = (timestamp) => {
  return dateFormat(timestamp, 'dd/mm/yy H:MM:ss');
};

export default change;
