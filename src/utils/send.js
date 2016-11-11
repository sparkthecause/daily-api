const postmark = require('postmark');
const { render } = require('mustache');

exports.sendEmails = ({ html, mergeVars, subject, text, to }, context) => {
  const client = new postmark.Client(context.config.postmark);

  const messages = [];

  if (!Array.isArray(to)) {
    throw new Error('When sending email, `to` must be an array of objects');
  }

  for (const recipient of to) {
    messages.push({
      From: context.config.email.from,
      To: recipient.email,
      Subject: subject,
      TextBody: text, // https://www.npmjs.com/package/html-to-text
      HtmlBody: render(html, Object.assign(mergeVars, recipient.mergeVars)),
      TrackOpens: true
    });
  }

  return new Promise((resolve, reject) => {
    client.sendEmailBatch(messages, (error, success) => {
      if (error) reject(error);
      resolve(success);
    });
  });
};
