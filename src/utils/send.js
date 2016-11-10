const postmark = require('postmark');

exports.sendEmails = (config, { html, subject, text, to }) => {
  const client = new postmark.Client(config.postmark);

  const messages = [];

  if (Array.isArray(to)) {
    for (const recipient of to) {
      messages.push({
        From: config.email.from,
        To: recipient,
        Subject: subject,
        TextBody: text, // https://www.npmjs.com/package/html-to-text
        HtmlBody: html,
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
