"use strict";

const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.disable( 'x-powered-by' );

// Redirect non-HTTPS traffic in production
if ( process.env.NODE_ENV === 'production' ) {

    var enforce = require('express-sslify');
    app.use( enforce.HTTPS( true ) );

}

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  res.render('home');
});

let server = app.listen(3000);
