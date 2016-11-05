const merge = require('merge');

const model = require('../models');
const edition = require('./edition');
const scalar = require('./scalar');
const subscriber = require('./subscriber');

// TODO: Add scalar types for date and email

const rootSchema = `
  type Query {
    edition(id: ID!): Edition
    subscriber(id: ID, email: String): Subscriber
    subscribers(ids: [ID], isActive: Boolean, emails: [String]): [Subscriber]
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
    },
    subscribers(root, {ids, isActive, emails}, context) {
      return model.findSubscribers({isActive, ids, emails}, context);
    }
  }
};

exports.typeDefs = [
  rootSchema,
  edition.schema,
  scalar.schema,
  subscriber.schema
];

exports.resolvers = merge.recursive(true,
  rootResolvers,
  edition.resolvers,
  scalar.resolvers
);
