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
    file: Upload
  ): Blurb!

  uploadImageForBlurb(
    id: ID!
    file: Upload!
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
    updateBlurbData (root, { id, data, file }, context) {
      if (file) {
        return models.uploadImageForBlurb(id, file, context)
        .then(url => models.updateBlurbData(id, { data: Object.assign(data, { src: url }) }, context));
      }
      return models.updateBlurbData(id, { data }, context);
    },
    uploadImageForBlurb (root, { id, file }, context) {
      return models.uploadImageForBlurb(id, file, context);
    }
  },

  Blurb: {
    approvedAt (root, { format }, context) {
      return (format) ? moment(root.approvedAt).format(format) : root.approvedAt;
    }
  }
};
