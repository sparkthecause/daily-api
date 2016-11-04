const editionModel = require('../models/edition');

exports.schema = `
  type Edition {
    id: ID
    publishOn: String
    subject: String
    css: String
    approvedAt: String
    blurbs: [Blurb]
  }

  type Blurb {
    id: ID
    position: Int
    approvedAt: String
    type: String
    data: String
  }
`;

exports.resolvers = {
  Edition: {
    blurbs(root, {}, context) {
      return editionModel.blurbsForEditionID(root.id, context);
    }
  }
}
