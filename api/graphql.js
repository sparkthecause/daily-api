const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const EditionHandler = require('./handlers/edition');

module.exports = (app) => {

  const editionHandler = new EditionHandler(app);

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
      blurbs: [Blurb]
    }

    type Blurb {
      id: ID,
      position: Int,
      approvedAt: String,
      type: String
    }
  `);

  const root = {
    edition: ({id, publishDate}) => editionHandler.editionForID(id)
  };

  return graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  });

};
