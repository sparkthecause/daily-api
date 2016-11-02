const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const EditionHandler = require('./handlers/edition');

module.exports = (app) => {

  const schema = buildSchema(`
    type Query {
      edition(id: ID!, publishDate: String): Edition
    }

    type Edition {
      id: ID,
      publishOn: String,
      subject: String,
      css: String,
      approvedAt: String
    }
  `);

  const editionHandler = new EditionHandler(app);

  const root = {
    edition: ({id, publishDate}) => editionHandler.editionForID(id)
  };

  return graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  });

};
