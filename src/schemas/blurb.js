// const blurbModel = require('../models/blurb');

exports.schema = `
  type Blurb {
    id: ID!
    position: Int
    approvedAt: Timestamp
    type: String!
    data: JSON
  }
`;

exports.resolvers = {};
