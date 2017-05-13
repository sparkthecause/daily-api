const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');

const comparePasswords = (input, hash) => bcrypt.compare(input, hash);

module.exports = (db) => new BasicStrategy((username, password, done) => {
  return db.select('*').from('users').where({ username })
  .then(users => (users.length && comparePasswords(password, users[0].password)) ? done(null, users[0]) : done(null, false))
  .catch(error => done(error));
});
