const moment = require('moment');
// const blurbModel = require('../models/blurb');

exports.schema = `
  type Blurb {
    id: ID!
    position: Int
    approvedAt (format: String): Timestamp
    type: String!
    data: JSON
  }
`;

exports.resolvers = {
  Blurb: {
    approvedAt (root, { format }, context) {
      return (format) ? moment(root.approvedAt).format(format) : root.approvedAt;
    }
  }
};
