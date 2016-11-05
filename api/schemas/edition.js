const editionModel = require('../models/edition');

exports.schema = `
  type Edition {
    id: ID!
    publishOn: String
    subject: String
    css: String
    cssHref: String
    approvedAt: String
    blurbs: [Blurb]
  }

  type Blurb {
    id: ID!
    position: Int
    approvedAt: String
    type: String
    data: String
  }
`;

exports.resolvers = {
  Edition: {
    blurbs(root, {}, context) {
      return editionModel.findBlurbsForEdition(root.id, context);
    }
  }
};
