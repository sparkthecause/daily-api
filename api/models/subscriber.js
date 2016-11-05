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
    .then(data => {
      if (!data.length) throw new Error(`No subscriber found for ${id ? 'id: ' + id : 'email: ' + email }`);
      return formatSubscriberData(data[0]);
    });
  },
  findSubscribers({ids, isActive, emails}, {knex}) {
    return knex.select('*').from('subscribers').modify(queryBuilder => {
      if (ids) queryBuilder.whereIn('subscriber_id', ids);
      if (isActive !== undefined) isActive ? queryBuilder.whereNull('unsubscribed_at') : queryBuilder.whereNotNull('unsubscribed_at');
      if (emails) queryBuilder.whereIn('email_address', emails);
    })
    .then(data => {
      if (!data.length) throw new Error(`No ${isActive ? 'active' : 'matching'} subscribers found ${ids ? 'with ids: ' + ids : ''} ${emails ? 'with emails: ' + emails : ''}`);
      return data.map(subscriber => formatSubscriberData(subscriber));
    });
  }
};

module.exports = subscriberModel;
