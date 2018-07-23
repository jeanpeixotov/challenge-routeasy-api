const express = require('express');
const consign = require('consign');
const debug = require('debug');

const app = express();

consign({ verbose: false, cwd: 'src' })
  .include('config.js')
  .then('db.js')
  .then('middlewares/base.js')
  .then('models')
  .then('controllers')
  .then('routes')
  .into(app);

if (process.env.NODE_ENV !== 'test') {
  app.listen(app.config.port, debug(`Running on port: ${app.config.port}`));
}

module.exports = app;
