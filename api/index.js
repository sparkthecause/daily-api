'use strict';

const router = require('express').Router();
const EditionHandler = require('./handlers/edition');

module.exports = app => {

    const editionHandler = new EditionHandler( app );

    router.route('/edition')
    .get((req, res) => {

      editionHandler.editionForDate(req.query.date)
      .then( result => {
        res.json(result);
      })
      .catch( error => {
        res.status(404).send('No edition found for that date.');
      });

    });

    return router;

};
