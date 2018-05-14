const app = require('express')();

const { 
  home, 
  authorization,
  accessToken,
  authorized
} = require('./routes');

const {
  session,
  verifyToken
} = require('./middleware');

const port = process.env.PORT || 3000;

// Enable sessions
app.use(session());

// Home route - there's only a link to /auth route
app.get('/', home);
// Auth Step 1 - redirection to Automatic oauth2 endpoint, passing requested scope
app.get('/auth', authorization);
// Auth Step 2 - callback service parsing the authorization token and asking for the access token
app.get('/redirect', accessToken);
// If access token exists, route will render user details
app.get('/welcome', verifyToken, authorized);

// Start server
app.listen(port, () => console.log('Express server started on port ' + port));
