const postmark = require('postmark');

module.exports = (app, options) => {
  const config = app.get('config');
  const client = new postmark.Client(config.postmark);

  const messages = [];

  if (Array.isArray(options.to)) {
    for (const recipient of options.to) {
      messages.push({
        From: config.email.from,
        To: recipient,
        Subject: options.subject,
        TextBody: options.text, // https://www.npmjs.com/package/html-to-text
        HtmlBody: options.html,
        TrackOpens: true
      });
    }
  }

  return new Promise((resolve, reject) => {
    client.sendEmailBatch(messages, (error, success) => {
      if (error) reject(error);

      resolve(success);
    });
  });
};
