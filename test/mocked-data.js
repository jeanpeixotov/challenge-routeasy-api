const moment = require('moment');
const mongoose = require('mongoose');

const delivery = {
  _id: mongoose.Types.ObjectId(),
  name: 'Joao da Silva',
  weight: 30,
  addressName: 'Rua Alvorada',
  addressNumber: 100,
  addressDistrict: 'Vila Olimpia',
  addressComplement: ' apto. 51',
  city: 'São Paulo',
  state: 'SP',
  country: 'BR',
  geolocationLatitude: 37.4224764,
  geolocationLongitude: -122.0842499,
  inserted: new Date(),
  lastUpdate: new Date(),
};

module.exports = delivery;