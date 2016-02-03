'use strict';

const router = require('express').Router();
const ArchiveHandler = require('../api/handlers/archive');

module.exports = app => {

  const archiveHandler = new ArchiveHandler( app );

  app.get('/', (req, res) => {
    res.render('home');
  });

  router.route('/archive')
  .get((req, res) => {

    const knex = app.get('knex');

    archiveHandler.editionForDate(req.query.date)
    .then( result => {

      res.render('archive', {
        "daily": result
      });

    })
    .catch( error => {
      res.status(404).send('No edition found for that date.');
    });

  });

    return router;

};
