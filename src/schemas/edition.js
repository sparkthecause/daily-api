const moment = require('moment');
const models = require('../models');

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

exports.query = `
  edition(
    id: ID
    publishDate: Date
  ): Edition

  editions(
    ids: [ID]
    publishOnOrAfter: Date
    publishOnOrBefore: Date
    isApproved: Boolean
  ): [Edition]
`;

exports.mutation = `
  approveEdition(
    id: ID!
  ): Edition

  createEdition(
    id: ID
    approvedAt: Timestamp
    cssHref: String
    publishDate: Date
    subject: String
  ): Edition!

  updateEdition(
    id: ID!
    approvedAt: Timestamp
    cssHref: String
    publishDate: Date
    subject: String
  ): Edition!
`;

exports.resolvers = {
  Query: {
    edition (root, { id, publishDate }, context) {
      return models.findEdition({ id, publishDate }, context);
    },
    editions (root, { ids, publishOnOrAfter, publishOnOrBefore, isApproved }, context) {
      return models.findEditions({ ids, publishOnOrAfter, publishOnOrBefore, isApproved }, context);
    }
  },

  Mutation: {
    approveEdition (root, { id }, context) {
      return models.approveEdition(id, context);
    },
    createEdition (root, args, context) {
      return models.createEdition(args, context);
    },
    updateEdition (root, { id, approvedAt, cssHref, publishDate, subject }, context) {
      return models.updateEdition(id, { cssHref, publishDate, subject }, context);
    }
  },

  Edition: {
    approvedAt (root, { format }, context) {
      return (format) ? moment(root.approvedAt).format(format) : root.approvedAt;
    },
    blurbs (root, args, context) {
      return models.findBlurbsForEdition(root.id, context);
    },
    publishOn (root, { format }, context) {
      return (format) ? moment(root.publishOn).format(format) : root.publishOn;
    },
    renderedHTML (root, args, context) {
      return models.renderHTMLForEdition(root, context);
    }
  }
};
