'use strict';

const router = require('express').Router();
const ArchiveHandler = require('./handlers/archive');

module.exports = function( app ) {

    const archiveHandler = new ArchiveHandler( app );

    router.route('/archive')
    .get( function( req, res ) {

      archiveHandler.editionForDate(req.query.date)
      .then( result => { res.json(result) })
      .catch( error => { res.status(404).send('No edition found for that date.') });

    });

    return router;

};
