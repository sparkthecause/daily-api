const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs, resolvers } = require('./schemas');

exports.server = (app) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  return graphqlExpress({
    schema,
    context: {
      config: app.get('config'),
      knex: app.get('knex')
    }
  });
};

exports.graphiql = graphiqlExpress({ endpointURL: '/graphql' });
