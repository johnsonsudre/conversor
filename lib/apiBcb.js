const axios = require("axios");

const getUrl = (date) =>
  `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${date}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;

const getFullQuotation = (url) => axios.get(url);

const extractQuotation = (fullQuotation) =>
  fullQuotation.data.value[0].cotacaoVenda;

const getQuotation =
  ({ getToday, getUrl, getFullQuotation, extractQuotation }) =>
  async (date) => {
    try {
      // const dateApiType = toDateBcbApi(date);
      const today = getToday(date);
      const url = getUrl(today);
      const fullQuotation = await getFullQuotation(url);
      const quotation = extractQuotation(fullQuotation);
      return quotation;
    } catch (err) {
      return "";
    }
  };

const getToday = (date) => {
  const today = new Date(date);
  return (
    today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear()
  );
};

module.exports = {
  getFullQuotation,
  extractQuotation,
  getQuotation: getQuotation({
    getToday,
    getUrl,
    getFullQuotation,
    extractQuotation,
  }),
  getToday,
  getUrl,
  pure: { getQuotation },
};
