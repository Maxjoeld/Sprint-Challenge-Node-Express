const express = require("express");
const Router = express.Router();
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const {
  currPrice,
  yesterdaysPrice,
  difference
} = require("../models/prices.js");


Router.get("/compare", (req, res) => {
  const currentPrice = currPrice().catch(err =>
    res.status(STATUS_USER_ERROR).json({ err: err })
  );
  const historicalPrice = yesterdaysPrice().catch(err =>
    res.status(STATUS_USER_ERROR).json({ err: err })
  );

  Promise.all([currentPrice, historicalPrice])
    .then(prices => {
      res.status(STATUS_SUCCESS);
      res.json(prices[0] - prices[1]);
    })
    .catch(err => res.status(STATUS_USER_ERROR).json({ err: err }));
});


module.exports = Router;
