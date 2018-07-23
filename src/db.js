const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('./config');

mongoose.Promise = Promise;

const options = {
  server: {
    socketOptions: {
      socketTimeoutMS: 0,
      connectTimeoutMS: 0,
    },
  },
};

module.exports = () => {
  const clientDB = mongoose.createConnection(config.clientDBUri, options);

  return {
    clientDB,
  };
};
