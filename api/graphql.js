const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    edition(id: ID, publishDate: String): Edition
  }

  type Edition {
    id: ID
    publishOn: String
    isApproved: Boolean
  }
`);

const root = {
  hello: () => 'Hello world!',
  edition: ({id, publishDate}) => {
    return {
    id: 'uuid',
    publishOn: '2016-12-16',
    isApproved: false
  }}
};

module.exports = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
});
