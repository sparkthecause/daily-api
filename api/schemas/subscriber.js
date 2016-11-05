const subscriberModel = require('../models/subscriber');

exports.schema = `
  type Subscriber {
    id: ID!
    email: String!
    createdAt: String!
    unsubscribedAt: String
  }
`;

exports.resolvers = {};
