const Promise = require('bluebird');
const Sendgrid = require('sendgrid');

module.exports = (app, options) => {
  const config = app.get('config');
  const sendgrid = new Sendgrid(config.sendgrid);
  const sendEmail = Promise.promisify(sendgrid.send, { context: sendgrid });

  return sendEmail({
    to: options.to,
    from: config.email.from,
    fromname: config.email.fromname,
    subject: options.subject,
    text: options.text, // https://www.npmjs.com/package/html-to-text
    html: options.html
  });
};
