const CronJob = require('cron').CronJob;
const moment = require('moment');
const model = require('../models');

module.exports = (app) => {
  const context = app.get('context');

  return new CronJob({
    cronTime: '00 30 5 * * 1-5',
    onTick: () => {
      // Runs every weekday (Monday through Friday) at 5:30:00 AM.
      const today = moment().format('YYYY-MM-DD');
      const editionPromise = model.findEdition({ publishDate: today }, context);
      const htmlPromise = editionPromise.then(edition => model.renderHTMLForEdition(edition, context));
      const subcribersPromise = model.findSubscribers({ isActive: true }, context);

      Promise.all([ editionPromise, htmlPromise, subcribersPromise ])
      .then(([ edition, html, subscribers ]) => subscribers.map(subscriber => model.sendMessage(
          Object.assign(edition, renderedHTML: html),
          { subscriber_id: subscriber.id },
          subscriber,
          context
      )));
    },
    start: true, // Start the job right now
    timeZone: 'America/New_York' // Time zone of this job.
  });
};
