const express = require('express');

const config = require('./config.js');
const placesController = require('./controller/prices.js')

const PORT = config.port;
const app = express();

app.use(placesController);
// const STATUS_SUCCESS = 200;
// const STATUS_USER_ERROR = 422;
// const { currPrice, yesterdaysPrice, difference } = require('./models/prices.js');
//
// app.get('/compare', (req, res) => {
//   const currentPrice = currPrice()
//     .catch(err => res.status(STATUS_USER_ERROR).json({ err: err}));
//   const historicalPrice = yesterdaysPrice()
//     .catch(err => res.status(STATUS_USER_ERROR).json({ err: err}));
//
//   Promise.all([currentPrice, historicalPrice])
//     .then(prices => {
//       res.status(STATUS_SUCCESS)
//       res.json(prices[0] - prices[1])
//     })
//     .catch(err => res.status(STATUS_USER_ERROR).json({ err: err}));
// });



app.listen(PORT, err => {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log(`Port is listening on port ${PORT}`);
  }
});













// app.get('/compare', (req, res) => {
//
//   // const currPrice =
//   //   fetch(CURRENT_VALUE)
//   //     .then(value => value.json())
//   //     .then(price => price.bpi.USD.rate_float)
//   //     .catch(err => res.status(STATUS_USER_ERROR).json( { err:err }));
//   //
//   // const yesterdayPrice =
//   //   fetch(YESTERDAYS_VALUE)
//   //     .then(value => value.json())
//   //     .then(price => Object.values(price.bpi)[0])
//   //     .catch(err => res.status(STATUS_USER_ERROR).json({ err: err}));
//
//   Promise.all([currPrice, yesterdaysPrice])
//     .then(prices => {
//       res.status(STATUS_SUCCESS)
//       res.json(prices[0] - prices[1])
//     })
//     .catch(err => res.status(STATUS_USER_ERROR).json({ err: err}));
// });
