// hardcoded for now, but sa my comment here states: 
// https://phabricator.automatic.co/T19790
// this should become a part now newly extracted javascript auth/user api

const request = require('superagent');

module.exports = {
  me(access_token) {
    if (!access_token) {
      res.sendStatus(401);
    }

    request
      .get('https://api.automatic.com/user/me/')
      .set('Authorization', 'Bearer ' + access_token)
      .set('Accept', 'application/json')
      .end((err, userRes) => {
        console.log(userRes)
          if (err) {
              if (userRes.unauthorized) {
                console.log('Unauthorized!');
                res.sendStatus(401);
                  // req.session.destroy(function(err) {
                  //     res.clearCookie('sessionid');
                  //     res.sendStatus(401);
                  // });
              } else {
                  console.log(err, userRes);
                  res.sendStatus(500);
              }
          } else {
              res.send(userRes.body);
          }
      });
  }
}