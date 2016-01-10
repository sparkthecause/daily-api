"use strict";

const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

if ( process.env.NODE_ENV === "production" || require("piping")() ) {

  app.disable( 'x-powered-by' );

  // Redirect non-HTTPS traffic in production
  if ( process.env.NODE_ENV === 'production' ) {

    var enforce = require('express-sslify');
    app.use( enforce.HTTPS({ trustProtoHeader: true }) );

  }

  app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
  }));

  app.set('view engine', 'hbs');

  app.use(express.static('public'));

  app.get('/', function (req, res) {
    res.render('home');
  });

  let server = app.listen(process.env.PORT || 3000);

}
