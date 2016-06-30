'use strict';

const Promise = require('bluebird');
const CronJob = require('cron').CronJob;
const moment = require('moment');

const EditionHandler = require('../handlers/edition');
const SubscriberHandler = require('../handlers/subscriber');
const send = require('./send');

module.exports = (app) => {

  const editionHandler = new EditionHandler(app);
  const subscriberHandler = new SubscriberHandler(app);

  return new CronJob({
    cronTime: '00 30 5 * * 1-5',
    onTick: () => {

      // Runs every weekday (Monday through Friday) at 5:30:00 AM.
      const date = moment().format('YYYY-MM-DD');

      const htmlPromise = editionHandler.editionHTMLforDate(date);
      const subcribersPromise = subscriberHandler.fetchActiveSubscribers();

      Promise.join(htmlPromise, subcribersPromise, (html, subscribers) => {

        return send(app, {
          to: subscribers.map(subscriber => subscriber.email_address),
          subject: 'Dynamic Test',
          html
        });

      })
      .catch(error => {

        throw error;

      });

    },
    start: true, // Start the job right now
    timeZone: 'America/New_York' // Time zone of this job.
  });

};
