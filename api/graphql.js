// const graphqlHTTP = require('express-graphql');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs, resolvers } = require('./schemas');

exports.server = (app) => {

  const schema = makeExecutableSchema({ typeDefs, resolvers: resolvers(app) });
  return graphqlExpress({ schema });

};

exports.graphiql = graphiqlExpress({ endpointURL: '/graphql' });
