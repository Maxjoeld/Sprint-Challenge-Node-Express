const express = require('express');
const fetch = require('node-fetch');

const config = require('./config.js');
const PORT = config.port;
const app = express();
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const CURRENT_VALUE = "https://api.coindesk.com/v1/bpi/currentprice.json";
const YESTERDAY_VALUE = "https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday";

app.get('/compare', (req, res) => {

  const currPrice =
    fetch(CURRENT_VALUE)
      .then(value => value.json())
      .then(price => price.bpi.USD.rate_float)
      .catch(err => res.status(STATUS_USER_ERROR).json( { err:err }));

  const yesterdayPrice =
    fetch(YESTERDAY_VALUE)
      .then(value => value.json())
      .then(price => Object.values(price.bpi)[0])
      .catch(err => res.status(STATUS_USER_ERROR).json({ err: err}));

  Promise.all([currPrice, yesterdayPrice])
    .then(prices => {
      res.status(STATUS_SUCCESS)
      res.json(prices[0] - prices[1])
    })
    .catch(err => res.status(STATUS_USER_ERROR).json({ err: err}));
});


app.listen(PORT, err => {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log(`Port is listening on port ${PORT}`);
  }
});
