const moment = require('moment');
const messageModel = require('../models/message');

exports.schema = `
  type Message {
    id: ID!
    editionID: ID!
    subscriberID: ID!
    sentAt (format: String): Timestamp
    openedAt (format: String): Timestamp
    bouncedAt (format: String): Timestamp
    bounceType: BounceType
  }

  type BounceType {
    id: ID!
    name: String
    description: String
    retryAfterNSeconds: Int
  }
`;

exports.resolvers = {
  Message: {
    sentAt (root, { format }, context) {
      return (format) ? moment(root.sentAt).format(format) : root.sentAt;
    },
    openedAt (root, { format }, context) {
      return (format) ? moment(root.openedAt).format(format) : root.openedAt;
    },
    bouncedAt (root, { format }, context) {
      return (format) ? moment(root.bouncedAt).format(format) : root.bouncedAt;
    }
  }
};
