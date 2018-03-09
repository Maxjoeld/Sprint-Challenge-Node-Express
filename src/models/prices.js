const fetch = require('node-fetch');
const CURRENT_VALUE = "https://api.coindesk.com/v1/bpi/currentprice.json";
const YESTERDAYS_VALUE = "https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday";

function currPrice() {
  return new Promise((resolve, reject) => {
    fetch(CURRENT_VALUE)
    .then(value => value.json())
    .then(price => price.bpi.USD.rate_float)
    .then(rate => {
      resolve(rate)
    })
    .catch(err => {
      reject(err);
    })
  });
}
function yesterdaysPrice() {
  return new Promise((resolve, reject) => {
    fetch(YESTERDAYS_VALUE)
      .then(value => value.json())
      .then(price => Object.values(price.bpi)[0])
      .then(rate => {
        resolve(rate)
      })
      .catch(err => {
        reject(err);
      })
  });
}

//this function does not work, can a TA possibly tell me why ?
function difference() {
  return new Promise((resolve, reject) => {
    Promise.all([currPrice, yesterdaysPrice])
    .then(prices => (prices[0] - prices[1]))
    .then(difference => {
      resolve(difference)
    })
    .catch(err => {
      reject(err);
    })
  });
}



module.exports = {
  currPrice,
  yesterdaysPrice,
  difference
}
