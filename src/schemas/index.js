const merge = require('merge');

const blurb = require('./blurb');
const edition = require('./edition');
const models = require('../models');
const scalar = require('./scalar');
const subscriber = require('./subscriber');

const rootSchema = `
  type Query {
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

    subscriber(
      id: ID
      email: String
    ): Subscriber

    subscribers(
      emails: [String]
      isActive: Boolean
      ids: [ID]
    ): [Subscriber]
  }

  type Mutation {
    approveBlurb(
      id: ID!
    ): Blurb

    approveEdition(
      id: ID!
    ): Edition

    createBlurb(
      id: ID
      position: Int
      approvedAt: Timestamp
      editionId: ID
      type: String!
      data: JSON
    ): Blurb!

    createEdition(
      id: ID
      approvedAt: Timestamp
      cssHref: String
      publishDate: Date
      subject: String
    ): Edition!

    removeBlurbFromEdition(
      blurbId: ID!
      editionId: ID!
    ): [Blurb]

    repositionBlurbs(
      blurbPositions: [BlurbPositionInput]
    ): [Blurb]

    subscribe(
      email: String!
    ): Subscriber!

    unsubscribe(
      id: ID!
    ): Subscriber!

    updateBlurb(
      id: ID!
      position: Int
      approvedAt: Timestamp
      data: JSON
    ): Blurb!

    updateEdition(
      id: ID!
      approvedAt: Timestamp
      cssHref: String
      publishDate: Date
      subject: String
    ): Edition!

    uploadImageForBlurb(
      id: ID!
      data: String!
      extension: String!
    ): String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const rootResolvers = {
  Query: {
    edition (root, { id, publishDate }, context) {
      return models.findEdition({ id, publishDate }, context);
    },
    editions (root, { ids, publishOnOrAfter, publishOnOrBefore, isApproved }, context) {
      return models.findEditions({ ids, publishOnOrAfter, publishOnOrBefore, isApproved }, context);
    },
    subscriber (root, { id, email }, context) {
      return models.findSubscriber({ id, email }, context);
    },
    subscribers (root, { ids, isActive, emails }, context) {
      return models.findSubscribers({ isActive, ids, emails }, context);
    }
  },
  Mutation: {
    approveBlurb (root, { id }, context) {
      return models.approveBlurb(id, context);
    },
    approveEdition (root, { id }, context) {
      return models.approveEdition(id, context);
    },
    createBlurb (root, args, context) {
      return models.createBlurb(args, context);
    },
    createEdition (root, args, context) {
      return models.createEdition(args, context);
    },
    removeBlurbFromEdition (root, { blurbId, editionId }, context) {
      return models.removeBlurbFromEdition(blurbId, editionId, context);
    },
    repositionBlurbs (root, { blurbPositions }, context) {
      return models.repositionBlurbs(blurbPositions, context);
    },
    subscribe (root, { email }, context) {
      return models.subscribe(email, context);
    },
    unsubscribe (root, { id }, context) {
      return models.unsubscribe(id, context);
    },
    updateBlurb (root, { id, approvedAt, data, position }, context) {
      return models.updateBlurb(id, { data, position }, context);
    },
    updateEdition (root, { id, approvedAt, cssHref, publishDate, subject }, context) {
      return models.updateEdition(id, { cssHref, publishDate, subject }, context);
    },
    uploadImageForBlurb (root, { id, data, extension }, context) {
      return models.uploadImageForBlurb(id, data, extension, context);
    }
  }
};

exports.typeDefs = [
  rootSchema,
  blurb.schema,
  edition.schema,
  scalar.schema,
  subscriber.schema
];

exports.resolvers = merge.recursive(true,
  rootResolvers,
  blurb.resolvers,
  edition.resolvers,
  scalar.resolvers,
  subscriber.resolvers
);
