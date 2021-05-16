const convert = (quotation, quantity) => {
  return quotation * quantity;
};

const toMoney = (value) => {
  return parseFloat(value).toFixed(2);
};

const splitDate = (date) => {
  const dt = new Date(date);
  const d = ("0" + dt.getDate()).slice(-2);
  const m = ("0" + (dt.getMonth() + 1)).slice(-2);
  const y = dt.getUTCFullYear().toString();
  return { d, m, y };
};

const toDateInputValue = (date) => {
  //"2013-1-29"
  const dt = splitDate(date);
  const inputDate = dt.y + "-" + dt.m + "-" + dt.d;
  return inputDate;
};

const toDateBcbApi = (date) => {
  // bcb = banco central do Brasil
  // mm-dd-yyyy
  //"01-20-2021"
  const dt = splitDate(date);
  //console.log("dt:", dt);
  const inputDate = dt.m + "-" + dt.d + "-" + dt.y;
  return inputDate;
};

module.exports = {
  convert,
  splitDate,
  toMoney,
  toDateInputValue,
  toDateBcbApi,
};
