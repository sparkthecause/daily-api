const formatSubscriberData = (subscriberData) => ({
  id: subscriberData.subscriber_id,
  email: subscriberData.email_address,
  createdAt: subscriberData.created_at,
  unsubscribedAt: subscriberData.unsubscribed_at
});

const subscriberModel = {
  findSubscriber({id, email}, {knex}) {
    if (!Boolean(id || email)) throw new Error('A valid id or email is required to find a subscriber');
    const where = id ? { subscriber_id: id } : { email_address: email };
    return knex.select('*').from('subscribers').where(where)
    .then(subscriberData => {
      if (!subscriberData.length) throw new Error(`No subscriber found for ${id ? 'id: ' + id : 'email: ' + email }`);
      return formatSubscriberData(subscriberData[0]);
    });
  },
  findSubscribers({ids, isActive, emails}, {knex}) {
    return knex.select('*').from('subscribers').modify(queryBuilder => {
      if (ids) queryBuilder.whereIn('subscriber_id', ids);
      if (isActive !== undefined) isActive ? queryBuilder.whereNull('unsubscribed_at') : queryBuilder.whereNotNull('unsubscribed_at');
      if (emails) queryBuilder.whereIn('email_address', emails);
    })
    .then(subscribersData => {
      if (!subscribersData.length) throw new Error(`No ${isActive ? 'active' : 'matching'} subscribers found ${ids ? 'with ids: ' + ids : ''} ${emails ? 'with emails: ' + emails : ''}`);
      return data.map(subscriberData => formatSubscriberData(subscriberData));
    });
  },
  unsubscribe(id, {knex}) {
    return knex('subscribers').update({unsubscribed_at: knex.fn.now()}).where({ subscriber_id: id }).returning('*')
    .then(subscriberData => {
      if (!subscriberData.length) throw new Error(`No subscriber found for id: ${id}`);
      return formatSubscriberData(subscriberData[0])
    });
  }
};

module.exports = subscriberModel;
