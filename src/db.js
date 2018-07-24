const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('./config');

mongoose.Promise = Promise;

module.exports = () => {
  const Delivery = mongoose.createConnection(config.deliveryDBUri);
  return { Delivery };
};
