const api = require("./apiBcb");

const axios = require("axios");

jest.mock("axios");

test("function getFullQuotation", () => {
  const fullQuotation = {};
  axios.get.mockResolvedValue(fullQuotation);
  api.getFullQuotation("url").then((resp) => {
    expect(resp).toEqual(fullQuotation);
    expect(axios.get.mock.calls[0][0]).toEqual("url");
  });
});

test("function extractQuotation", () => {
  const fullQuotation = api.extractQuotation({
    data: {
      value: [{ cotacaoVenda: 3.9 }],
    },
  });
  expect(fullQuotation).toBe(3.9);
});

describe("group test - getToday", () => {
  const RealDate = global.Date; // salva a função Date original
  function mockDate(date) {
    global.Date = class extends RealDate {
      constructor() {
        return new RealDate(date);
      }
    };
    afterEach(() => {
      global.Date = RealDate;
    });
  }
  test("getToday", () => {
    mockDate("2019-01-01T12:00:00z");
    const today = api.getToday();
    expect(today).toBe("1-1-2019");
  });
});

test("egtUrl", () => {
  const url = api.getUrl("MINHA-DATA");
  expect(url).toBe(
    "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27MINHA-DATA%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao"
  );
});

test("getQuotation", () => {
  const fullQuotation = {
    data: {
      value: [{ cotacaoVenda: 3.9 }],
    },
  };
  const getToday = jest.fn();
  getToday.mockReturnValue("1-1-2019");
  const getUrl = jest.fn();
  getUrl.mockReturnValue("url");
  const getFullQuotation = jest.fn();
  getFullQuotation.mockReturnValue(Promise.reject("err"));
  const extractQuotation = jest.fn();
  extractQuotation.mockReturnValue(3.9);
  api.pure
    .getQuotation({ getToday, getUrl, getFullQuotation, extractQuotation })()
    .then((resQuotation) => {
      expect(resQuotation).toBe(3.9);
    });
});
