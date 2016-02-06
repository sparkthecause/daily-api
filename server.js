'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
// const Promise = require('bluebird');
const app = express();
const config = require('./config');

if ( process.env.NODE_ENV === "production" || require("piping")() ) {

  app.disable( 'x-powered-by' );

  const postgresURL = config.postgres.url;

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

  app.use('/', require('./www')(app));
  app.use('/api', require('./api')(app));

  const server = app.listen(process.env.PORT || 3000);

}
