module.exports = (app) => {
  const Delivery = app.models.delivery;
  const Controller = {};

  Controller.listDelivery = (req, res, next) => {
    User.findOne({ _id: req.delivery.id })
      .then(res.json.bind(res))
      .catch(next);
  };

  Controller.addDelivery = (req, res, next) => {
  };

  Controller.updateDelivery = (req, res, next) => {
  };

  Controller.removeDelivery = (req, res, next) => {
  };

  return Controller;
};
