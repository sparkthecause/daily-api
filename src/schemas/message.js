const moment = require('moment');
const models = require('../models');

exports.schema = `
  type Message {
    id: ID!
    editionID: ID!
    subscriberID: ID!
    deliveredAt (format: String): Timestamp
    openedAt (format: String): Timestamp
    bouncedAt (format: String): Timestamp
    bounceType: BounceType
  }

  type BounceType {
    id: ID!
    name: String
    description: String
    retryAfterNSeconds: Int
  }
`;

exports.query = `
  message(
    id: ID
  ): Message

  messages(
    ids: [ID]
    senderId: ID
    editionId: ID
  ): [Message]
`;

exports.mutation = `
  sendMessage(
    editionId: ID!
    subscriberId: ID!
  ): Message
`;

exports.resolvers = {
  Query: {
    message (root, { id }, context) {
      return models.findMessage( id, context );
    },
    messages (root, { ids, editionId, subscriberId }, context) {
      return models.findMessages( { messageIds: ids, editionId, subscriberId }, context );
    }
  },

  Mutation: {
    sendMessage(root, { editionId, subscriberId }, context) {
      return Promise.all([
        models.findEdition({ id: editionId }, context)
        .then(editionData => models.renderHTMLForEdition(editionData, context).then(renderedHTML => Object.assign(editionData, { renderedHTML }))),
        models.findSubscriber({ id: subscriberId }, context)
      ])
      .then(([ editionData, subscriberData ]) => {
        return models.sendMessage(editionData, subscriberData, {}, context);
      })
    }
  },

  Message: {
    deliveredAt (root, { format }, context) {
      return (format) ? moment(root.deliveredAt).format(format) : root.deliveredAt;
    },
    openedAt (root, { format }, context) {
      return (format) ? moment(root.openedAt).format(format) : root.openedAt;
    },
    bouncedAt (root, { format }, context) {
      return (format) ? moment(root.bouncedAt).format(format) : root.bouncedAt;
    }
  }
};
