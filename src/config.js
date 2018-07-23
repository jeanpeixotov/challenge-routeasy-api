const requiredEnvVars = [
  'CLIENT_DB_URI',
  'PORT',
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
  clientDBUri: `mongodb://${process.env.CLIENT_DB_URI}`,
};
