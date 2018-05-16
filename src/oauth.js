const { clientId, site, tokenPath } = require('../package.json').automatic;

module.exports = require('simple-oauth2')({
  clientID: process.env.AUTOMATIC_CLIENT_ID || clientId,
  clientSecret: process.env.AUTOMATIC_CLIENT_SECRET,
  site,
  tokenPath
});
