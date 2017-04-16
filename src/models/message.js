const { render } = require('mustache');

const messageModel = {

  findMessage (id, { knex }) {
    return knex.select('*').from('messages').where({ message_id: id })
    .then(messageData => (message.length) ? messageData[0] : null);
  },

  findMessages ({ ids, editionId, subscriberId }, { knex }) {
    return knex.select('*').from('messages').modify(queryBuilder => {
      if (ids) queryBuilder.whereIn('message_id', ids);
      if (editionId) queryBuilder.where({ edition_id: editionId });
      if (subscriberId) queryBuilder.where({ subscriber_id: subscriberId });
    });
    // .then(messageData => messagesData.map(messageData => formatMessageData(editionData)));
  },

  sendMessage (edition, subscriber, mergeVars, { config, knex, postmark }) {
    const message = {
      From: config.email.from,
      HtmlBody: render(edition.renderedHTML, mergeVars),
      Subject: edition.subject,
      To: subscriber.email,
      // TextBody: text, // https://www.npmjs.com/package/html-to-text
      // TrackLinks: "HtmlAndText",
      TrackOpens: true
    };

    return new Promise((resolve, reject) => {
      postmark.sendEmail(message, (error, success) => (error ? reject(error) : resolve(success)));
    })
    .then(response => {
      console.log(response, subscriber, edition)
      return knex.insert({
        message_id: response.MessageID,
        subscriber_id: subscriber.id,
        edition_id: edition.id
      }).into('messages').returning('*')
    });
  },

  messageDelivered(id, deliveredAt, { knex }) {
    return knex('messages').update({ delivered_at: deliveredAt }).where({ message_id: id }).returning('*');
  }

};

module.exports = messageModel;
