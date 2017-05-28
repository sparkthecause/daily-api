const bcrypt = require('bcryptjs');

const userModel = {

  createUser (username, password, optionalData, { knex }) {
    if (!username || !password) throw new Error('username and password are required');

    return bcrypt.hash(password, 8)
    .then(hashedPassword => Object.assign({ username, password: hashedPassword }, optionalData))
    .then(user => knex.insert(user).into('users').returning('*'))
    .then(userData => (userData.length) ? userData[0] : null);
  },

  findUser (userId, { knex }) {
    return knex.select('*').from('users').where({ userId })
    .then(userData => (userData.length) ? userData[0] : null);
  },

  findUsers ({ userIds, canAccess }, { knex }) {
    return knex.select('*').from('users').modify(queryBuilder => {
      if (userIds) queryBuilder.whereIn('userId', userIds);
      if (canAccess !== undefined) queryBuilder.where({ canAccess });
    });
  },

  login (username, password, { knex }) {
    return knex.select('*').from('users').where({ username })
    .then(users => {
      const isValid = users.length && bcrypt.compare(password, users[0].password);
      if (isValid) {
        let user = users[0];
        delete user.password;
        return user;
      }
      throw new Error('InvalidCredentials');
    });
  }

};

module.exports = userModel;
