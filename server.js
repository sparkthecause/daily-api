'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const enforce = require('express-sslify');

const app = express();
const config = require('./config');
app.set('config', config);

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const pg = require('knex')({
  client: 'pg',
  connection: config.postgres,
  debug: config.isDebug
});
app.set('knex', pg);

// Redirect non-HTTPS traffic in production
if (config.isProduction) app.use(enforce.HTTPS({ trustProtoHeader: true }));

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static('assets'));

app.use('/', require('./www')(app));
app.use('/api', require('./api')(app));

app.listen(config.port);
