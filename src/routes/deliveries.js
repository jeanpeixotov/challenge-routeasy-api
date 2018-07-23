const errorHandler = require('http-errors-middleware');

module.exports = (app) => {
  const Controller = app.controllers.deliveries;

  app.route('/deliveries')
    .post(Controller.addDelivery);

  app.route('/deliveries')
    .put(Controller.updateDelivery);

  app.route('/deliveries')
    .delete(Controller.removeDelivery);

  app.route('/deliveries')
    .get(Controller.listDelivery);
  
  app.use(errorHandler());
};
