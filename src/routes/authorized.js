const api = require('../api');

module.exports = function authorized(req, res) {
  api
    .me(req.session.token.token.access_token)
    .then(result => {
      if (result.status in [401, 403]) {
        console.log('Unauthorized!');
        req.session.destroy();
        res.sendStatus(result.status);          
      } else {
        const msg = 'You are logged in as ' + result.body.username;
        console.log(msg);
        res.send(msg);            
      }
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
}
