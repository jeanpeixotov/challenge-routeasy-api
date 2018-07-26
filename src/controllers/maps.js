const createError = require('http-errors');
const request = require('request-promise');
const config = require('../config');

module.exports = (app) => {
  const Controller = {};
  const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  Controller.searchLocation = async (req, res, next) => {
    try {
      const fullUrl = `${url}${req.params.address}&key=${config.googleKey}`;
      const result = await request(fullUrl);
      return res.json(result);
    } catch(err) {
      next(createError(err));
    }
  };
  return Controller;
};
