const merge = require('merge');
const edition = require('./edition');

const editionModel = require('../models/edition');

const rootSchema = `
  type Query {
    edition(id: ID!, publishDate: String): Edition
  }

  schema {
    query: Query
  }
`;

const rootResolvers = {
  Query: {
    edition(root, {id, publishDate}, context) {
      return editionModel.findEdition(id, context);
    }
  }
};

exports.typeDefs = [rootSchema, edition.schema];
exports.resolvers = merge.recursive(true, rootResolvers, edition.resolvers);
