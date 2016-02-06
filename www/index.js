'use strict';

const router = require('express').Router();
const moment = require('moment');
const ArchiveHandler = require('../api/handlers/archive');

const today = () => moment().format('YYYY-MM-DD');

module.exports = app => {

  const knex = app.get('knex');
  const archiveHandler = new ArchiveHandler( app );

  app.get('/', (req, res) => {
    res.render('home');
  });

  router.route('/archive')
  .get((req, res) => {

    const publishDate = req.query.date || today();

    archiveHandler.editionForDate(publishDate)
    .then( result => {

      res.render('archive', {
        "daily": result
      });

    })
    .catch( error => {

      res.render('archive', {
        "error": "No edition found for that date."
      });

    });

  });

  return router;

};
