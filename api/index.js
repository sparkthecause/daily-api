'use strict';

const router = require('express').Router();
const EditionHandler = require('./handlers/edition');
const SubscriberHandler = require('./handlers/subscriber');

module.exports = app => {

  const editionHandler = new EditionHandler( app );
  const subscriberHandler = new SubscriberHandler( app );

  router.route('/editions')
  .get((req, res) => {

    editionHandler.editionForDate(req.query.date)
    .then( result => {
      res.json(result);
    })
    .catch( error => {
      if (error === '404') {
        res.status(404).send('No edition found for that date.');
      }
    });

  });

  router.route('/subscribers')
  .post((req, res) => {

    subscriberHandler.editionForDate(req.query.date)
    .then( result => {
      res.json(result);
    })
    .catch( error => {
      res.status(500).send(error);
    });

  });

  return router;

};
