const {
  convert,
  splitDate,
  toMoney,
  toDateBcbApi,
  toDateInputValue,
} = require("./convert");

test("function convert: multiply quotation * quantity", () => {
  expect(convert(2, 4)).toBe(8);
});

test("spliDate", () => {
  expect(splitDate(new Date("2021-05-12T19:45:24.083Z"))).toStrictEqual({
    d: "12",
    m: "05",
    y: "2021",
  });
});

test("Convert 0 to 4", () => {
  expect(convert(0, 4)).toBe(0);
});

test("Convert to money", () => {
  expect(toMoney(2)).toBe("2.00");
});

test("Convert string to money", () => {
  expect(toMoney("2")).toBe("2.00");
});

//"01-20-2021"
test("Convert date to bcb api date type", () => {
  expect(toDateBcbApi(new Date("2021-05-12T19:45:24.083Z"))).toBe("05-12-2021");
});

//"2013-1-29"
test("Convert date to value of input type=date", () => {
  expect(toDateInputValue(new Date("2021-05-12T19:45:24.083Z"))).toBe(
    "2021-05-12"
  );
});
