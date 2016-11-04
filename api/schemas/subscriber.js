const subscriberModel = require('../models/subscriber');

exports.schema = `
  type Subscriber {
    id: ID!
    emailAddress: String!
    createdAt: String!
    unsubscribedAt: String
  }
`;

exports.resolvers = {};
