const { automatic: { scope } } = require('../../package.json');
const oauth = require('../oauth');

module.exports = function authorization(req, res) {
  const authorizationUri = oauth.authCode.authorizeURL({ scope });
  res.redirect(authorizationUri);
}
