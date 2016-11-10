const moment = require('moment');
// const subscriberModel = require('../models/subscriber');

exports.schema = `
  type Subscriber {
    id: ID!
    email: String!
    createdAt (format: String): Timestamp!
    unsubscribedAt (format: String): Timestamp
  }
`;

exports.resolvers = {
  Subscriber: {
    createdAt (root, { format }, context) {
      return (format) ? moment(root.createdAt).format(format) : root.createdAt;
    },
    unsubscribedAt (root, { format }, context) {
      return (format) ? moment(root.unsubscribedAt).format(format) : root.unsubscribedAt;
    }
  }
};
