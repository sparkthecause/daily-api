const moment = require('moment');
const models = require('../models');

exports.schema = `
  type Subscriber {
    id: ID!
    email: String!
    createdAt (format: String): Timestamp!
    unsubscribedAt (format: String): Timestamp
  }
`;

exports.query = `
  subscriber(
    id: ID
    email: String
  ): Subscriber

  subscribers(
    emails: [String]
    isActive: Boolean
    ids: [ID]
  ): [Subscriber]
`;

exports.mutation = `
  subscribe(
    email: String!
  ): Subscriber!

  unsubscribe(
    id: ID!
  ): Subscriber!
`;

exports.resolvers = {
  Query: {
    subscriber (root, { id, email }, context) {
      return models.findSubscriber({ id, email }, context);
    },
    subscribers (root, { ids, isActive, emails }, context) {
      return models.findSubscribers({ isActive, ids, emails }, context);
    }
  },

  Mutation: {
    subscribe (root, { email }, context) {
      return models.subscribe(email, context);
    },
    unsubscribe (root, { id }, context) {
      return models.unsubscribe(id, context);
    }
  },

  Subscriber: {
    createdAt (root, { format }, context) {
      return (format) ? moment(root.createdAt).format(format) : root.createdAt;
    },
    unsubscribedAt (root, { format }, context) {
      return (format) ? moment(root.unsubscribedAt).format(format) : root.unsubscribedAt;
    }
  }
};
