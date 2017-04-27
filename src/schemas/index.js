const merge = require('merge');

const blurb = require('./blurb');
const edition = require('./edition');
const message = require('./message');
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

    message(
      id: ID
    ): Message

    messages(
      ids: [ID]
      senderId: ID
      editionId: ID
    ): [Message]

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

    repositionBlurb(
      id: ID!
      position: Int
    ): Blurb!

    repositionBlurbs(
      blurbPositions: [BlurbPositionInput]
    ): [Blurb]

    sendMessage(
      editionId: ID!
      subscriberId: ID!
    ): Message

    subscribe(
      email: String!
    ): Subscriber!

    unsubscribe(
      id: ID!
    ): Subscriber!

    updateBlurbData(
      id: ID!
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
    message (root, { id }, context) {
      return models.findMessage( id, context );
    },
    messages (root, { ids, editionId, subscriberId }, context) {
      return models.findMessages( { messageIds: ids, editionId, subscriberId }, context );
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
    repositionBlurb (root, { id, position }, context) {
      return models.updateBlurb(id, { position }, context);
    },
    repositionBlurbs (root, { blurbPositions }, context) {
      return models.repositionBlurbs(blurbPositions, context);
    },
    sendMessage(root, { editionId, subscriberId }, context) {
      return Promise.all([
        models.findEdition({ id: editionId }, context)
        .then(editionData => models.renderHTMLForEdition(editionData, context).then(renderedHTML => Object.assign(editionData, { renderedHTML }))),
        models.findSubscriber({ id: subscriberId }, context)
      ])
      .then(([ editionData, subscriberData ]) => {
        return models.sendMessage(editionData, subscriberData, {}, context);
      })
    },
    subscribe (root, { email }, context) {
      return models.subscribe(email, context);
    },
    unsubscribe (root, { id }, context) {
      return models.unsubscribe(id, context);
    },
    updateBlurbData (root, { id, data }, context) {
      return models.updateBlurbData(id, { data }, context);
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
  message.schema,
  scalar.schema,
  subscriber.schema
];

exports.resolvers = merge.recursive(true,
  rootResolvers,
  blurb.resolvers,
  edition.resolvers,
  message.resolvers,
  scalar.resolvers,
  subscriber.resolvers
);
