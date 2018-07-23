const errorHandler = require('http-errors-middleware');

module.exports = (app) => {
  app.get('/', (req, res) => res.json({
    status: 'Alive',
  }));

  app.use(errorHandler());
};
