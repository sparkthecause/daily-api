const moment = require('moment');
const editionModel = require('../models/edition');

exports.schema = `
  type Edition {
    id: ID!
    publishOn (format: String): Date
    subject: String
    cssHref: String
    approvedAt (format: String): Timestamp
    blurbs: [Blurb]
    renderedHTML: String
  }
`;

exports.resolvers = {
  Edition: {
    approvedAt (root, { format }, context) {
      return (format) ? moment(root.approvedAt).format(format) : root.approvedAt;
    },
    blurbs (root, args, context) {
      return editionModel.findBlurbsForEdition(root.id, context);
    },
    publishOn (root, { format }, context) {
      return (format) ? moment(root.publishOn).format(format) : root.publishOn;
    },
    renderedHTML (root, args, context) {
      return editionModel.renderHTMLForEdition(root, context);
    }
  }
};
