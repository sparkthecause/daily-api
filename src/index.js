const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const graphql = require('./graphql');
const postmark = require('postmark');
const enforce = require('express-sslify');
const config = require('./config');
const cron = require('./utils/cron');
const s3 = require('./connectors/s3');
const webhooks = require('./webhooks');

const app = express();
const pg = require('knex')({
  client: 'pg',
  connection: config.postgres,
  debug: config.env === 'development'
});

app.disable('x-powered-by');

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('context', {
  config,
  knex: pg,
  postmark: new postmark.Client(config.postmark),
  s3
});

// Redirect non-HTTPS traffic in production
if (config.env === 'production') app.use(enforce.HTTPS({ trustProtoHeader: true }));

// CORS becuase the web is a silly place
app.options('*', cors());

// Root, so Heroku and any sane developer can get important data
app.get('/', (req, res) => res.json({
  env: config.env,
  version: config.version
}));

// GraphQL stuffs curtesy of the Apollo team
app.use('/graphql', bodyParser.json(), graphql.server(app));
if (config.env === 'development') {
  app.use('/graphiql', graphql.graphiql);
}

// Webhooks for things we want to know but don't control
app.use('/webhooks', webhooks);

// A challenge, if you want to return the Let's Encrypt certbot response
app.get('/.well-known/acme-challenge/:content', (req, res) => res.send(process.env.CERTBOT_RESPONSE));

// A CRON job to send email
cron(app);

app.listen(config.port);
console.log(`Worker listening on :${config.port}`);
