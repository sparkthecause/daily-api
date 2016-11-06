const editionModel = require('../models/edition');

exports.schema = `
  type Edition {
    id: ID!
    publishOn: Date
    subject: String
    cssHref: String
    approvedAt: Timestamp
    blurbs: [Blurb]
    renderedHTML: String
  }

  type Blurb {
    id: ID!
    position: Int
    approvedAt: Timestamp
    type: String
    data: JSON
  }
`;

exports.resolvers = {
  Edition: {
    blurbs (root, args, context) {
      return editionModel.findBlurbsForEdition(root.id, context);
    },
    renderedHTML (root, args, context) {
      return editionModel.renderHTMLForEdition(root, context);
    }
  }
};
