const { render } = require('mustache');

const messageModel = {

  findMessage (messageId, { knex }) {
    return knex.select('*').from('messages').where({ messageId })
    .then(messageData => (message.length) ? messageData[0] : null);
  },

  findMessages ({ messageIds, editionId, subscriberId }, { knex }) {
    return knex.select('*').from('messages').modify(queryBuilder => {
      if (ids) queryBuilder.whereIn('messageId', messageIds);
      if (editionId) queryBuilder.where({ editionId });
      if (subscriberId) queryBuilder.where({ subscriberId });
    });
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
    .then(response => knex.insert({
      messageId: response.MessageID,
      subscriberId: subscriber.id,
      editionId: edition.id
    }).into('messages').returning('*'));
  },

  messageBounced(messageId, bouncedAt, bounceTypeId, { knex }) {
    return knex('messages').update({ bouncedAt, bounceTypeId }).where({ messageId }).returning('*');
  },

  messageDelivered(messageId, deliveredAt, { knex }) {
    return knex('messages').update({ deliveredAt }).where({ messageId }).returning('*');
  },

  messageOpened(messageId, openedAt, metadata, { knex }) {
    const data = Object.assign({ messageId, openedAt }, metadata);
    return knex.insert(data).into('opens').returning('*')
  }

};

module.exports = messageModel;
