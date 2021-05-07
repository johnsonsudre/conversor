const convert = (quotation, quantity) => {
  return quotation * quantity
}

const toMoney = value => {
  return parseFloat(value).toFixed(2)
}

module.exports = {
  convert, toMoney
}