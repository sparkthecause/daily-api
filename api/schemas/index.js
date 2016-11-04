const merge = require('merge');
const edition = require('./edition');
const EditionHandler = require('../handlers/edition');

const rootSchema = `
  type Query {
    edition(id: ID!, publishDate: String): Edition
  }

  schema {
    query: Query
  }
`;

const rootResolvers = (app) => {

  const editionHandler = new EditionHandler(app);
  return {
    Query: {
      edition(root, {id, publishDate}, context) {
        return editionHandler.editionForID(id);
      }
    }
  };
};

exports.typeDefs = [rootSchema, edition.schema];
exports.resolvers = (app) => merge.recursive(true, rootResolvers(app), edition.resolvers(app));
