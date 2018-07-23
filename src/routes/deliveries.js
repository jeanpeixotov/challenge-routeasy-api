const errorHandler = require('http-errors-middleware');

module.exports = (app) => {
  const Controller = app.controllers.deliveries;

  app.route('/deliveries')
    .post(Controller.addDelivery);

  app.route('/deliveries')
    .put(Controller.updateDelivery);

  app.route('/deliveries/:deliveryId')
    .get(Controller.listDelivery);

  app.route('/deliveries/:deliveryId')
    .delete(Controller.removeDelivery);
  
  app.use(errorHandler());
};
