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
app.use('/graphiql', graphql.graphiql);

cron(app);

app.listen(config.port);