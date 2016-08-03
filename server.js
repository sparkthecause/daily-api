const express = require('express');
const bodyParser = require('body-parser');
// const enforce = require('express-sslify');

const config = require('./config');

const app = express();
const pg = require('knex')({
  client: 'pg',
  connection: config.postgres,
  debug: config.env === 'development'
});

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('knex', pg);
app.set('config', config);

// Redirect non-HTTPS traffic in production - TODO: TEMP DISABLED
// if (config.env === production) app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use('/', require('./api')(app));

app.listen(config.port);
