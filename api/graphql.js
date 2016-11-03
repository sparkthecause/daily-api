// const graphqlHTTP = require('express-graphql');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const EditionHandler = require('./handlers/edition');

exports.server = (app) => {

  const editionHandler = new EditionHandler(app);

  const schema = `
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

    schema {
      query: Query
    }
  `;

  const resolvers = {
    Query: {
      edition(root, {id, publishDate}, context) {
        return editionHandler.editionForID(id);
      }
    }
  };

  const executableSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers
  });

  return graphqlExpress({
    schema: executableSchema
  });

};

exports.graphiql = graphiqlExpress({ endpointURL: '/graphql' });
