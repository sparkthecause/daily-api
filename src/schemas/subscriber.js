const subscriberModel = require('../models/subscriber');

exports.schema = `
  type Subscriber {
    id: ID!
    email: String!
    createdAt: Timestamp!
    unsubscribedAt: Timestamp
  }
`;

exports.resolvers = {};
