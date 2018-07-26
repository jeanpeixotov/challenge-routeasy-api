const requiredEnvVars = [
  'DELIVERY_DB_URI',
  'PORT',
  'GOOGLE_KEY'
];

const checkEnvVars = (() => {
  requiredEnvVars.forEach((reqVar) => {
    if (!(reqVar in process.env)) {
      throw Error(`Required environment variable ${reqVar} is not set.`);
    }
  });
});
checkEnvVars();

module.exports = {
  port: process.env.PORT,
  deliveryDBUri: `mongodb://${process.env.DELIVERY_DB_URI}`,
  googleKey: process.env.GOOGLE_KEY,
};
