const merge = require('merge');

const blurb = require('./blurb');
const edition = require('./edition');
const message = require('./message');
const scalar = require('./scalar');
const subscriber = require('./subscriber');
const user = require('./user');

const rootSchema = `
  input Upload {
    name: String!
    type: String!
    size: Int!
    path: String!
  }

  type Query {
    ${blurb.query}
    ${edition.query}
    ${message.query}
    ${subscriber.query}
    ${user.query}
  }

  type Mutation {
    ${blurb.mutation}
    ${edition.mutation}
    ${message.mutation}
    ${subscriber.mutation}
    ${user.mutation}
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
  subscriber.schema,
  user.schema
];

exports.resolvers = merge.recursive(true,
  blurb.resolvers,
  edition.resolvers,
  message.resolvers,
  scalar.resolvers,
  subscriber.resolvers,
  user.resolvers
);
