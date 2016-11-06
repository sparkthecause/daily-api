const CronJob = require('cron').CronJob;
const moment = require('moment');

const model = require('../models');
const send = require('./send');

module.exports = (app) => {
  const context = { knex: app.get('knex') };

  return new CronJob({
    cronTime: '00 30 5 * * 1-5',
    onTick: () => {
      // Runs every weekday (Monday through Friday) at 5:30:00 AM.
      const today = moment().format('YYYY-MM-DD');
      const editionPromise = model.findEdition({ publishDate: today }, context);
      const htmlPromise = editionPromise.then(edition => model.renderHTMLForEdition(edition, context));
      const subcribersPromise = model.findSubscribers({ isActive: true }, context);

      Promise.all([ editionPromise, htmlPromise, subcribersPromise ])
      .then(([ edition, html, subscribers ]) => send.sendEmails(config, {
        to: subscribers.map(subscriber => subscriber.email),
        subject: edition.subject,
        html
      }));
    },
    start: true, // Start the job right now
    timeZone: 'America/New_York' // Time zone of this job.
  });
};
