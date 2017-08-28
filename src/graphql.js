const { apolloUploadExpress } = require('apollo-upload-server');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs, resolvers } = require('./schemas');

exports.server = (app) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  return graphqlExpress({
    schema,
    context: app.get('context')
  });
};

exports.uploads = () => apolloUploadExpress({
  uploadDir: '/tmp/uploads'
});

exports.graphiql = graphiqlExpress({ endpointURL: '/graphql' });
