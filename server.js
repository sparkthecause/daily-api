const express = require('express');
const bodyParser = require('body-parser');
// const enforce = require('express-sslify');

const config = require('./config');

const app = express();
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

// Redirect non-HTTPS traffic in production - TODO: TEMP DISABLED
// if (config.isProduction) app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use('/', require('./api')(app));

app.listen(config.port);
