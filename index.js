const express = require("express");
const { read } = require("fs");
const path = require("path");
const { convert, toMoney } = require("./lib/convert");

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
    console.log("convert my money está online em", port);
  }
});

// ROUTES
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/quotation", (req, res) => {
  const { query } = req;
  const { quotation, quantity } = query;
  if (quotation && quantity) {
    const convertion = convert(quotation, quantity);
    console.log(query);
    res.render("quotation", {
      error:false,
      quotation: toMoney(quotation),
      quantity: toMoney(quantity),
      convertion: toMoney(convertion),
    });
  } else {
    res.render('quotation', {
      error: 'Valor inválido.'
    })
  }
});
