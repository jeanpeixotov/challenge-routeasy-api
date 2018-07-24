const mongoose = require('mongoose');

const { Schema } = mongoose;

const Delivery = new Schema({
  name: String,
  weight: Number,
  addressName: String,
  addressNumber: Number,
  addressDistrict: String,
  addressComplement: String,
  city: String,
  state: String,
  country: String,
  geolocationLatitude: Number,
  geolocationLongitude: Number,
  inserted: { type: Date, default: Date.now },
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = app => app.db.Delivery.model('delivery', Delivery);