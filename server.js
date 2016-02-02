'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
// const Promise = require('bluebird');
const app = express();
const config = require('./config');

if ( process.env.NODE_ENV === "production" || require("piping")() ) {

  app.disable( 'x-powered-by' );

  const postgresURL = config.postgres.development; //process.env.DATABASE_URL || (process.env.CI) ? :
  const pg = require('knex')({
    client: 'pg',
    connection: postgresURL,
    debug: true
  });
  app.set('knex', pg);

  // Redirect non-HTTPS traffic in production
  if ( process.env.NODE_ENV === 'production' ) {

    const enforce = require('express-sslify');
    app.use( enforce.HTTPS({ trustProtoHeader: true }) );

  }

  const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
  });

  app.engine('hbs', hbs.engine);
  app.set('view engine', 'hbs');

  app.use(express.static('assets'));

  app.get('/', function (req, res) {
    res.render('home');
  });

  // app.use( '/api', require( './api' )( app ) );

  app.get('/archive', function (req, res) {

    const knex = app.get('knex');

    const publishDate = '2016-02-01';

    knex.select().from('editions').where({'publish_on': publishDate})
    .then( rows => {

      console.log(rows);

      res.render('archive', {
        "daily": rows[0]
      });

    });

    // const editionsQuery = `SELECT * FROM editions WHERE editions.publish_on = now()::date`;
    // const blurbsQuery = `SELECT blurbs.* FROM blurbs WHERE edition_id = (SELECT edition_id FROM editions WHERE publish_on = now()::date)`;
    // const imagesQuery = `SELECT * FROM images WHERE blurb_id = (SELECT blurb_id FROM editions WHERE publish_on = now()::date)`;
    //
    // Promise.join(db.query(editionsQuery), db.query(blurbsQuery), db.query(imagesQuery), function(editions, blurbs, images) {
    //
    //   for ( const edition of editions ) {
    //     edition.blurbs = blurbs;
    //     for ( const blurb of edition.blurbs ) {
    //       blurb.images = images;
    //     }
    //   }
    //
    //   res.render('archive', {
    //     "daily": editions[0]
    //   });
    //
    // })
    // .catch(function (error) {
    //     console.log(error); // display the error;
    // });

  });

  const server = app.listen(process.env.PORT || 3000);

}
