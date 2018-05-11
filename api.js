// hardcoded for now, but sa my comment here states: 
// https://phabricator.automatic.co/T19790
// this should become a part now newly extracted javascript auth/user api

_accessToken = null;

module.exports = {
  accessToken(token) {
    if (token) {
      _accessToken = token;
    }
    return _accessToken;
  },

  me() {
    if (req.session.isLoggedIn) {
        request
        .get('https://api.automatic.com/user/me/')
        .set('Authorization', 'Bearer ' + req.session.token.access_token)
        .set('Accept', 'application/json')
        .end((err, userRes) => {
            if (err) {
                if (userRes.unauthorized) {
                    req.session.destroy(function(err) {
                        res.clearCookie('sessionid');
                        res.sendStatus(401);
                    });
                } else {
                    console.log(err, userRes);
                    res.sendStatus(500);
                }
            } else {
                res.send(userRes.body);
            }
        });
    } else {
        // No token
        res.sendStatus(401);
    }    
  }
}