const errorHandler = require('http-errors-middleware');

module.exports = (app) => {
  const Controller = app.controllers.maps;

  app.route('/map/:address')
  .get(Controller.searchLocation);

  app.use(errorHandler());
}