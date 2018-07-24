const joi = require('joi');
const createError = require('http-errors');
const schema = joi.object().keys({
  _id: joi.string().allow(null),
  name: joi.string().required(),
  weight: joi.number().required(),
  addressName: joi.string().required(),
  addressNumber: joi.number().required(),
  addressDistrict: joi.string().required(),
  addressComplement: joi.string().required(),
  city: joi.string().required(),
  state: joi.string().required(),
  country: joi.string().required(),
  geolocationLatitude: joi.number().required(),
  geolocationLongitude: joi.number().required(),
  inserted: joi.string().allow(null),
  lastUpdate: joi.string().allow(null),
  __v: joi.number().allow(null),
});

const validate = async (model) => {
  return await joi.validate(model, schema);
}
module.exports = validate;