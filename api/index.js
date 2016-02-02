'use strict';

const router = require('express').Router();

module.exports = function( app ) {

    const config = app.get( 'config' );
    const knex = app.get( 'knex' );

    router.route('/archive')
    .get( function( req, res ) {

      const publishDate = '2016-02-01';

      knex.select().from('editions').where({'publish_on': publishDate})
      .then( rows => {

        res.json(rows[0]);

      });

    });

    return router;

};
