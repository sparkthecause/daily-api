const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = { hello: () => 'Hello world!' };

module.exports = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
});
