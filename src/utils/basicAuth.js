const BasicStrategy = require('passport-http').BasicStrategy;
const models = require('../models');

module.exports = (knex) => new BasicStrategy((username, password, done) => {
  return models.login(username, password, { knex })
  .then(user => done(null, user))
  .catch(error => {
    const isInvalidCredentials = error.message === 'InvalidCredentials';
    return (isInvalidCredentials) ? done(null, false) : done(error);
  });
});
