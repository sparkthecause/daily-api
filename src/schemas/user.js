const models = require('../models');

exports.schema = `
  # Users are editors and/or authors in the Composer
  type User {
    userId: ID!
    username: String!
    firstName: String
    lastName: String
    canAccess: Boolean!
  }
`;

exports.query = `
  user(
    userId: ID
  ): User

  users(
    userIds: [ID]
    canAccess: Boolean
  ): [User]
`;

exports.mutation = `
  createUser(
    username: String!
    password: String!
    firstName: String
    lastName: String
    canAccess: Boolean
  ): User
`;

exports.resolvers = {
  Query: {
    user (root, { userId }, context) {
      return models.findUser(userId, context);
    },
    users (root, { userIds, canAccess }, context) {
      return models.findUsers({ userIds, canAccess }, context);
    }
  },

  Mutation: {
    createUser (root, { username, password, firstName, lastName, canAccess }, context) {
      return models.createUser(username, password, { firstName, lastName, canAccess }, context);
    }
  }
};
