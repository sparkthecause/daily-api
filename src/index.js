const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const graphql = require('./graphql');
// const enforce = require('express-sslify');
const cron = require('./utils/cron');

const config = require('./config');

const app = express();
const pg = require('knex')({
  client: 'pg',
  connection: config.postgres,
  debug: config.env === 'development'
});

app.disable('x-powered-by');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('knex', pg);
app.set('config', config);

// Redirect non-HTTPS traffic in production - TODO: TEMP DISABLED
// if (config.env === production) app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.options('*', cors());
app.use('/graphql', bodyParser.json(), graphql.server(app));
if (config.env === 'development') {
  app.use('/graphiql', graphql.graphiql);
}

app.get('/', (req, res) => res.json({
  env: config.env,
  version: config.version
}));

// Return the Let's Encrypt certbot response:
app.get('/.well-known/acme-challenge/:content', (req, res) => {
  this.body = process.env.CERTBOT_RESPONSE;
});

cron(app);

app.listen(config.port);
