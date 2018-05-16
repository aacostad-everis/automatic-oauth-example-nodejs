const oauth = require('../oauth');

module.exports = function accessToken(req, res) {
  oauth.authCode.getToken({
    code: req.query.code
  }, saveToken);
    
  function saveToken(error, result) {
    if (error) {
      const err = 'Access token error: ' + error.message;
      console.log(err);
      res.send(err);
      return;
    }

    // Attach `token` to the user's session for later use
    // This is where you could save the `token` to a database for later use
    req.session.token = oauth.accessToken.create(result);

    res.redirect('/welcome');
  }
}
