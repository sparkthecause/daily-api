const merge = require('merge');

const model = require('../models');
const edition = require('./edition');
const subscriber = require('./subscriber');

const rootSchema = `
  type Query {
    edition(id: ID!): Edition
    subscriber(id: ID, email: String): Subscriber
  }

  schema {
    query: Query
  }
`;

const rootResolvers = {
  Query: {
    edition(root, {id}, context) {
      return model.findEdition(id, context);
    },
    subscriber(root, {id, email}, context) {
      return model.findSubscriber({id, email}, context);
    }
  }
};

exports.typeDefs = [
  rootSchema,
  edition.schema,
  subscriber.schema
];

exports.resolvers = merge.recursive(true,
  rootResolvers,
  edition.resolvers
);
