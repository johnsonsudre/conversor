const moment = require("moment");
const express = require("express");
const { read } = require("fs");
const path = require("path");
const {
  convert,
  toMoney,
  toDateInputValue,
  toDateBcbApi,
} = require("./lib/convert");

const apiBcb = require("./lib/apiBcb");

const port = process.env.PORT || 3000;

// CONFIG
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// ...definir pasta ./public
app.use(express.static(path.join(__dirname, "public")));

// PORT
app.listen(port, (err) => {
  if (err) {
    console.log("Não foi possível comunicar com o servidor. Erro: ", err);
  } else {
    console.log("Conversor está online em", port);
  }
});

// ROUTES
app.get("/", async (req, res) => {
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const todayInputValue = toDateInputValue(today);
  let quotation = await apiBcb.getQuotation(today);
  moment.locale("pt-br");
  const fullDateString = moment(today).format("LL");
  res.render("home", { quotation, todayInputValue, fullDateString });
});

app.get("/quotation", (req, res) => {
  const { query } = req;
  const { date, quotation, quantity } = query;
  if (quotation && quantity) {
    const convertion = convert(quotation, quantity);
    console.log(query);
    res.render("quotation", {
      error: false,
      quotation: toMoney(quotation),
      quantity: toMoney(quantity),
      convertion: toMoney(convertion),
    });
  } else {
    res.render("quotation", {
      error: "Valor inválido.",
    });
  }
});
