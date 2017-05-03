const merge = require('merge');

const blurb = require('./blurb');
const edition = require('./edition');
const message = require('./message');
const models = require('../models');
const scalar = require('./scalar');
const subscriber = require('./subscriber');

const rootSchema = `
  type Query {
    ${blurb.query}
    ${edition.query}
    ${message.query}
    ${subscriber.query}
  }

  type Mutation {
    ${blurb.mutation}
    ${edition.mutation}
    ${message.mutation}
    ${subscriber.mutation}
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

exports.typeDefs = [
  rootSchema,
  blurb.schema,
  edition.schema,
  message.schema,
  scalar.schema,
  subscriber.schema
];

exports.resolvers = merge.recursive(true,
  blurb.resolvers,
  edition.resolvers,
  message.resolvers,
  scalar.resolvers,
  subscriber.resolvers
);
