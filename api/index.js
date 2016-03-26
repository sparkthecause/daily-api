'use strict';

const express = require('express');
const router = new express.Router();
const EditionHandler = require('./handlers/edition');
const SubscriberHandler = require('./handlers/subscriber');
const send = require('./utils/send');

module.exports = app => {

  const editionHandler = new EditionHandler(app);
  const subscriberHandler = new SubscriberHandler(app);

  router.route('/editions')
  .get((req, res) => {

    editionHandler.editionForDate(req.query.date)
    .then(result => res.json(result))
    .catch(error => {

      if (error === '404') return res.status(404).send('No edition found for that date.');
      return res.status(500).send(error);

    });

  });

  router.route('/send')
  .post((req, res) => {

    send(app, {})
    .then(json => res.json(json))
    .catch(error => res.status(500).send(error));

  });

  router.route('/subscribers')
  .post((req, res) => {

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
