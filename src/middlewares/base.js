const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

module.exports = (app) => {
  app.use(helmet());
  app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowHeaders: ['Content-Type', 'Accept', 'Authorization'],
  }));
  app.use(compression());
};
