const validateBody = async (body) => await validate(body);

module.exports = (app) => {
  const Delivery = app.models.delivery;
  const Controller = {};

  Controller.listDelivery = (req, res, next) => {
    try {
      const result = await Delivery.findOne({ _id: res.params.deliveryId });
      return res.json.bind(result);
    } catch(err) {
      next(err);
    }
  };

  Controller.addDelivery = (req, res, next) => {
    try {
      const body = await validateBody(req.body);
      await Delivery.save(body);
      return res.json({
        success: true,
        message: 'Delivery added!',
        deliveryId: response._id,
      });
      return result;
    } catch(err) {
      next(err);
    }
  };

  Controller.updateDelivery = (req, res, next) => {
    try {
      const body = await validateBody(req.body);
      await Delivery.update({ _id: body.id });
      return res.json({
        success: true,
        message: 'Delivery updated!',
      });
    } catch(err) {
      next(err);
    }
  };

  Controller.removeDelivery = (req, res, next) => {
    try {
      const body = await validateBody(req.body);
      const result = await Delivery.remove({ _id: body.id });
      return res.json({
        success: true,
        message: 'Delivery deleted!',
      });
    } catch(err) {
      next(err);
    }
  };

  return Controller;
};
