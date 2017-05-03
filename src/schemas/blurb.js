const moment = require('moment');
const models = require('../models');

exports.schema = `
  type Blurb {
    id: ID!
    position: Int
    approvedAt (format: String): Timestamp
    type: String!
    data: JSON
  }

  input BlurbInput {
    data: JSON
  }

  input BlurbPositionInput {
    id: ID!
    position: Int
  }
`;

exports.query = ``;

exports.mutation = `
  approveBlurb(
    id: ID!
  ): Blurb

  createBlurb(
    id: ID
    position: Int
    approvedAt: Timestamp
    editionId: ID
    type: String!
    data: JSON
  ): Blurb!

  removeBlurbFromEdition(
    blurbId: ID!
    editionId: ID!
  ): [Blurb]

  repositionBlurb(
    id: ID!
    position: Int
  ): Blurb!

  repositionBlurbs(
    blurbPositions: [BlurbPositionInput]
  ): [Blurb]

  updateBlurbData(
    id: ID!
    data: JSON
  ): Blurb!

  uploadImageForBlurb(
    id: ID!
    data: String!
    extension: String!
  ): String
`;

exports.resolvers = {
  Query: {},

  Mutation: {
    approveBlurb (root, { id }, context) {
      return models.approveBlurb(id, context);
    },
    createBlurb (root, args, context) {
      return models.createBlurb(args, context);
    },
    removeBlurbFromEdition (root, { blurbId, editionId }, context) {
      return models.removeBlurbFromEdition(blurbId, editionId, context);
    },
    repositionBlurb (root, { id, position }, context) {
      return models.updateBlurb(id, { position }, context);
    },
    repositionBlurbs (root, { blurbPositions }, context) {
      return models.repositionBlurbs(blurbPositions, context);
    },
    updateBlurbData (root, { id, data }, context) {
      return models.updateBlurbData(id, { data }, context);
    },
    uploadImageForBlurb (root, { id, data, extension }, context) {
      return models.uploadImageForBlurb(id, data, extension, context);
    }
  },

  Blurb: {
    approvedAt (root, { format }, context) {
      return (format) ? moment(root.approvedAt).format(format) : root.approvedAt;
    }
  }
};
