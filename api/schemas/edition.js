const editionModel = require('../models/edition');

exports.schema = `
  type Edition {
    id: ID!
    publishOn: String
    subject: String
    cssHref: String
    approvedAt: String
    blurbs: [Blurb]
    renderedHTML: String
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
    },
    renderedHTML(root, {}, context) {
      return editionModel.renderHTMLForEdition(root, context);
    }
  }
};
