const merge = require('merge');
const edition = require('./edition');
const subscriber = require('./subscriber');

const editionModel = require('../models/edition');
const subscriberModel = require('../models/subscriber');

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
      return editionModel.findEdition(id, context);
    },
    subscriber(root, {id, email}, context) {
      return subscriberModel.findSubscriber({id, email}, context);
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
