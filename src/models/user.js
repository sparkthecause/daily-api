const bcrypt = require('bcryptjs');

const userModel = {

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

  createUser (username, password, optionalData, { knex }) {
    if (!username || !password) throw new Error('username and password are required');

    return bcrypt.hash(password, 8)
    .then(hashedPassword => Object.assign({ username, password: hashedPassword }, optionalData))
    .then(user => knex.insert(user).into('users').returning('*'))
    .then(userData => (userData.length) ? userData[0] : null);
  }

};

module.exports = userModel;
