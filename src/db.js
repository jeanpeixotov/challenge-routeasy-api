const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('./config');

mongoose.Promise = Promise;

module.exports = () => {
  return mongoose.createConnection(config.clientDBUri);
};
