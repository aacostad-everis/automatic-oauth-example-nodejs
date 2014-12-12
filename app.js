var express = require('express'),
    session = require('express-session'),
    port = process.env.PORT || 3000,
    https = require('https'),
    app = express();

// Add your automatic client id and client secret here or as environment variables
var AUTOMATIC_CLIENT_ID = process.env.AUTOMATIC_CLIENT_ID || "your-automatic-client-id";
var AUTOMATIC_CLIENT_SECRET = process.env.AUTOMATIC_CLIENT_SECRET || "your-automatic-client-secret";

var oauth2 = require('simple-oauth2')({
  clientID: AUTOMATIC_CLIENT_ID,
  clientSecret: AUTOMATIC_CLIENT_SECRET,
  site: 'https://accounts.automatic.com',
  tokenPath: '/oauth/access_token'
});

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
  scope: 'scope:user:profile scope:trip scope:location scope:vehicle:profile scope:vehicle:events scope:behavior'
});

// Enable sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// Initial page redirecting to Automatic's oAuth page
app.get('/auth', function (req, res) {
  res.redirect(authorization_uri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/redirect', function (req, res) {
  var code = req.query.code;

  oauth2.authCode.getToken({
    code: code
  }, saveToken);

  function saveToken(error, result) {
    if (error) {
      console.log('Access token error', error.message);
      res.send('Access token error: ' +  error.message);
      return
    }

    // Attach `token` to the user's session for later use
    // This is where you could save the `token` to a database for later use
    req.session.token = oauth2.accessToken.create(result);

    res.redirect('/welcome');
  }
});

app.get('/welcome', function (req, res) {
  if(req.session.token) {
    // Display token to authenticated user
    console.log('Automatic access token', req.session.token.token.access_token);
    res.send('You are logged in.<br>Access Token: ' +  req.session.token.token.access_token);
  } else {
    // No token, so redirect to login
    res.redirect('/');
  }
});

// Main page of app with link to log in
app.get('/', function (req, res) {
  res.send('<a href="/auth">Log in with Automatic</a>');
});

// Start server
app.listen(port);

console.log('Express server started on port ' + port);
