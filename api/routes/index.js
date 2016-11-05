const express = require('express');
const router = new express.Router();
const SubscriberHandler = require('../handlers/subscriber');
const send = require('../utils/send');
const cron = require('../utils/cron');

module.exports = (app) => {
  cron(app);

  const subscriberHandler = new SubscriberHandler(app);

  router.route('/send')
  .post((req, res) => {
    // to: STRING 'charles@cvburgess.com'
    // subject STRING
    // text: STRING 'ball'
    // html: STRING options.html

    send(app, req.body)
    .then(json => res.json(json))
    .catch(error => res.status(500).send(error));
  });

  router.route('/subscribers')
  .get((req, res) => {
    subscriberHandler.fetchActiveSubscribers()
    .then(result => res.json(result));
  })
  .post((req, res) => {
    // email: STRING 'charles@sparkthecause.com'

    subscriberHandler.newSubscriberWithEmail(req.body.email)
    .then(result => res.json(result))
    .catch(error => {
      let status = 500;
      if (error.message === 'email is in use') status = 400;
      if (error.message === 'email is invalid') status = 400;

      return res.status(status).send({
        message: error.message || error
      });
    });
  })
  .delete((req, res) => {
    // id: UUID '123-asdf-5678-ghjk'

    subscriberHandler.unsubscribe(req.query.id)
    .then(() => res.sendStatus(204))
    .catch(error => {
      return res.status(500).send({
        message: error.message || error
      });
    });
  });

  return router;
};
