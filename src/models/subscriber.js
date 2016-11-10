const validator = require('validator');

const formatSubscriberData = (subscriberData) => ({
  id: subscriberData.subscriber_id,
  email: subscriberData.email_address,
  createdAt: subscriberData.created_at,
  unsubscribedAt: subscriberData.unsubscribed_at
});

const subscriberModel = {
  findSubscriber ({id, email}, {knex}) {
    if (!(id || email)) throw new Error('A valid id or email is required to find a subscriber');
    const where = id ? { subscriber_id: id } : { email_address: email };
    return knex.select('*').from('subscribers').where(where)
    .then(subscriberData => {
      if (!subscriberData.length) throw new Error(`No subscriber found for ${id ? 'id: ' + id : 'email: ' + email}`);
      return formatSubscriberData(subscriberData[0]);
    });
  },
  findSubscribers ({ids, isActive, emails}, {knex}) {
    return knex.select('*').from('subscribers').modify(queryBuilder => {
      if (ids) queryBuilder.whereIn('subscriber_id', ids);
      if (isActive !== undefined) isActive ? queryBuilder.whereNull('unsubscribed_at') : queryBuilder.whereNotNull('unsubscribed_at');
      if (emails) queryBuilder.whereIn('email_address', emails);
    })
    .then(subscribersData => {
      if (!subscribersData.length) throw new Error(`No ${isActive ? 'active' : 'matching'} subscribers found ${ids ? 'with ids: ' + ids : ''} ${emails ? 'with emails: ' + emails : ''}`);
      return subscribersData.map(subscriberData => formatSubscriberData(subscriberData));
    });
  },
  subscribe (email, {knex}) {
    if (!validator.isEmail(email)) throw new Error(`Cannot create subscriber with invalid email address: ${email}`);
    return knex.insert({ email_address: email }).into('subscribers').returning('*')
    .then(subscriberData => formatSubscriberData(subscriberData[0]))
    .catch(error => {
      // if the email is already in the db, throw an error
      if (error.constraint === 'subscribers_email_address_key') throw new Error(`Subscriber already exists with email: ${email}`);
      // if all else fails, throw the raw error
      throw error;
    });
  },
  unsubscribe (id, {knex}) {
    return knex('subscribers').update({unsubscribed_at: knex.fn.now()}).where({ subscriber_id: id }).returning('*')
    .then(subscriberData => {
      if (!subscriberData.length) throw new Error(`No subscriber found for id: ${id}`);
      return formatSubscriberData(subscriberData[0]);
    });
  }
};

module.exports = subscriberModel;
