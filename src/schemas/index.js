const merge = require('merge');

const edition = require('./edition');
const models = require('../models');
const scalar = require('./scalar');
const subscriber = require('./subscriber');

const rootSchema = `
  type Query {
    edition( id: ID, publishDate: Date ): Edition
    subscriber( id: ID, email: String ): Subscriber
    subscribers( emails: [String], isActive: Boolean, ids: [ID] ): [Subscriber]
  }

  type Mutation {
    createEdition( id: ID, approvedAt: Timestamp, cssHref: String, publishDate: Date, subject: String): Edition!
    subscribe( email: String! ): Subscriber!
    unsubscribe( id: ID! ): Subscriber!
    updateEdition( id: ID!, approvedAt: Timestamp, cssHref: String, publishDate: Date, subject: String): Edition!
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
    subscriber (root, { id, email }, context) {
      return models.findSubscriber({ id, email }, context);
    },
    subscribers (root, { ids, isActive, emails }, context) {
      return models.findSubscribers({ isActive, ids, emails }, context);
    }
  },
  Mutation: {
    createEdition (root, args, context) {
      return models.createEdition(args, context);
    },
    subscribe (root, { email }, context) {
      return models.subscribe(email, context);
    },
    unsubscribe (root, { id }, context) {
      return models.unsubscribe(id, context);
    },
    updateEdition (root, { id, approvedAt, cssHref, publishDate, subject }, context) {
      return models.updateEdition(id, { approvedAt, cssHref, publishDate, subject }, context);
    }
  }
};

exports.typeDefs = [
  rootSchema,
  edition.schema,
  scalar.schema,
  subscriber.schema
];

exports.resolvers = merge.recursive(true,
  rootResolvers,
  edition.resolvers,
  scalar.resolvers,
  subscriber.resolvers
);
