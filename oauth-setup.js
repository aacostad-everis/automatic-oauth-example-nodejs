// Add your automatic client id and client secret here or as environment variables
const AUTOMATIC_CLIENT_ID = process.env.AUTOMATIC_CLIENT_ID || 'your-automatic-client-id';
const AUTOMATIC_CLIENT_SECRET = process.env.AUTOMATIC_CLIENT_SECRET || 'your-automatic-client-secret';

const oauth2 = require('simple-oauth2')({
  clientID: AUTOMATIC_CLIENT_ID,
  clientSecret: AUTOMATIC_CLIENT_SECRET,
  site: 'https://accounts.automatic.com',
  tokenPath: '/oauth/access_token'
});

module.exports = oauth2