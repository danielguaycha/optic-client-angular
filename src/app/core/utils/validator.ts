import * as moment from "moment";

function isString(value: any) {
  return typeof value === "string"
}

function isNumber(value: any) {
  const number = Number(value);
  return (!Number.isNaN(number));
}

function inArray(array: Array<any>, value: any) {
  return array.indexOf(value) < 0;
}

function isDateFormat(format: string, date: string) {
  return moment(date, format).format(format) === date
}

function isObject(value: any) {
  return typeof value === "object";
}

function isEmail(value: any) {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(value.toString().toLowerCase());
}

function isPhone (value: any) {
  const regExp = /\+?([0-9]{5,16})/;
  return regExp.test(value.toString());
}

function isMin(value:any, min: any) {
  if (isNumber(value)) {
    return value >= min;
  }
  if (isString(value)) {
    return value.toString().length >= min;
  }
  return true;
}

function isMax(value: any, min: any) {
  if (isNumber(value)) {
    return value <= min;
  }
  if (isString(value)) {
    return value.toString().length <= min;
  }
}

function isMinMax(value: any, minMax: any) {
  return isMin(value, minMax) && isMax(value, minMax);
}

function isBoolean(value: any) {
  return !(value !== "true" && value !== "false");
}

function isValidPw(text: string) {
  return /^[A-Za-z0-9]\w{8,}$/.test(text);
}

function isSecurePw(text: string, especialChar = false) {
  let regex = /./;
  if (especialChar) {
    regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
  } else {
    regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  }
  return regex.test(text);
}

export default {
  isString, isNumber, inArray, isMax, isMin, isMinMax,
  isDateFormat, isObject, isEmail, isPhone, isBoolean,
  isSecurePw, isValidPw
}
