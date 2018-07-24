const moment = require('moment');
const mongoose = require('mongoose');

const deliveryInsert = {
  name: 'Joao da Silva',
  weight: 30,
  addressName: 'Rua Alvorada',
  addressNumber: 100,
  addressDistrict: 'Vila Olimpia',
  addressComplement: 'apto. 51',
  city: 'São Paulo',
  state: 'SP',
  country: 'BR',
  geolocationLatitude: 37.4224764,
  geolocationLongitude: -122.0842499,
};

const deliveryInserted = {
  _id: '5b57853c51e9410020bba941',
  name: 'Joao da Silva',
  weight: 30,
  addressName: 'Rua Alvorada',
  addressNumber: 100,
  addressDistrict: 'Vila Olimpia',
  addressComplement: 'apto. 51',
  city: 'São Paulo',
  state: 'SP',
  country: 'BR',
  geolocationLatitude: 37.4224764,
  geolocationLongitude: -122.0842499,
  inserted: new Date(),
  lastUpdate: new Date(),
};

const deliveryUpdate = {
  _id: '5b57853c51e9410020bba941',
  name: 'Pedro Cardoso',
  addressName: 'Rua das araucarias',
  addressNumber: 50,
  geolocationLatitude: 45.422222,
  geolocationLongitude: -90.0814299,
  weight: 30,
  addressDistrict: 'Vila Olimpia',
  addressComplement: 'apto. 51',
  city: 'São Paulo',
  state: 'SP',
  country: 'BR',
};

module.exports = {deliveryInsert, deliveryInserted, deliveryUpdate};