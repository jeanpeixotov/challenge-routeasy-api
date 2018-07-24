const validate = require('../utils/validator');
const createError = require('http-errors');

const deliveryNotFound = () => createError(404, 'DELIVERY ID NOT FOUND');

module.exports = (app) => {
  const Delivery = app.models.delivery;
  const Controller = {};

  Controller.listDelivery = async (req, res, next) => {
    try {
      const result = await Delivery.findOne({ _id: req.params.deliveryId });
      if(!result) throw deliveryNotFound();

      return res.json(result);
    } catch(err) {
      next(createError(err));
    }
  };

  Controller.addDelivery = async (req, res, next) => {
    try {
      await validate(req.body);
      const newDelivery = new Delivery();
      const result = await newDelivery.save(req.body);
      return res.json({
        success: true,
        message: 'Delivery added',
        deliveryId: result._id,
      });
    } catch(err) {
      next(createError(err));
    }
  };

  Controller.updateDelivery = async (req, res, next) => {
    try {
      if(!req.body._id) throw deliveryNotFound();
      await validate(req.body);
      
      const result = await Delivery.updateOne({ _id: req.body._id }, { $set: req.body });
      return res.json({
        success: true,
        message: 'Delivery updated',
        deliveryId: req.body._id,
      });
    } catch(err) {
      next(createError(err));
    }
  };

  Controller.removeDelivery = async (req, res, next) => {
    try {
      const result = await Delivery.findOne({ _id: req.params.deliveryId });
      if(!result) throw deliveryNotFound();

      await Delivery.remove({ _id: req.params.deliveryId });
      return res.json({
        success: true,
        message: 'Delivery deleted',
        deliveryId: req.params.deliveryId,
      });
    } catch(err) {
      next(createError(err));
    }
  };

  return Controller;
};
