const { clientId, site, tokenPath } = require('../package.json').automatic;

const oauth2 = require('simple-oauth2')({
  clientID: process.env.AUTOMATIC_CLIENT_ID || clientId,
  clientSecret: process.env.AUTOMATIC_CLIENT_SECRET,
  site,
  tokenPath
});

module.exports = oauth2
