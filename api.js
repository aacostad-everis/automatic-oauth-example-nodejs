// hardcoded for now, but as my comment here states: 
// https://phabricator.automatic.co/T19790
// this should become a part of a separate javascript auth/user api

const request = require('superagent');

module.exports = {
  me(access_token) {
    return request
      .get('https://api.automatic.com/user/me/')
      .set('Authorization', 'Bearer ' + access_token)
      .set('Accept', 'application/json')
  }
}