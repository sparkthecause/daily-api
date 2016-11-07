const editionModel = require('../models/edition');

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
