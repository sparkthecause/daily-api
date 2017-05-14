const BasicStrategy = require('passport-http').BasicStrategy;

module.exports = (knex) => new BasicStrategy((username, password, done) => {
  models.login(username, password, { knex })
  .then(user => done(null, user))
  .catch(error => done(error));
});
