import { joi, validateAsPromise } from '../../services/joi.config';

const schema = joi.object().keys({
  id: joi.string().guid().allow(null),
  name: joi.string(),
  weight: joi.number(),
  addressName: joi.string(),
  addressNumber: joi.number(),
  addressDistrict: joi.string(),
  addressComplement: joi.string(),
  city: joi.string(),
  state: joi.string(),
  country: joi.string(),
  geolocationLatitude: joi.string(),
  geolocationLongitude: joi.string(),
  inserted: joi.string().allow(null),
  lastUpdate: joi.string().allow(null),
});

export function validate(model) {
  return validateAsPromise(model, schema);
}


