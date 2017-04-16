const { render } = require('mustache');

const messageModel = {

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
      return knex.insert({
        id: response.MessageID,
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
