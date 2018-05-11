module.exports = {
  home,
  authorization,
  accessToken,
  authorized
}

const oauth = require('./oauth-setup');

function home(req, res) {
  res.send('<a href="/auth">Log in with Automatic</a>');
}

function authorization(req, res) {
  const authorizationUri = oauth.authCode.authorizeURL({
    scope: 'scope:user:profile scope:trip scope:location scope:vehicle:profile scope:vehicle:events scope:behavior'
  });
  res.redirect(authorizationUri);
}

function accessToken(req, res) {
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

function authorized(req, res) {
  if (req.session.token) {
    const msg = 'You are logged in.<br>Access Token: ' +  req.session.token.token.access_token;
    console.log(msg)
    res.send(msg);
  } else {
    res.redirect('/');
  }
}