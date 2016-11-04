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
  }
};

module.exports = subscriberModel;
