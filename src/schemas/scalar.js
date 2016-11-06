const { Kind } = require('graphql/language');
const moment = require('moment');

exports.schema = `
  scalar Date
  scalar JSON
  scalar Timestamp
`;

const parseDatetimeLiteral = (ast) => {
  switch (ast.kind) {
    case Kind.INT:
      return parseInt(ast.value, 10);
    case Kind.STRING:
      return ast.value;
    default:
      return null;
  }
};

const parseJSONLiteral = (ast) => {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT: {
      const value = Object.create(null);
      ast.fields.forEach(field => {
        value[field.name.value] = parseJSONLiteral(field.value);
      });
      return value;
    }
    case Kind.LIST:
      return ast.values.map(value => parseJSONLiteral(value));
    default:
      return null;
  }
};

exports.resolvers = {
  Date: {
    __parseLiteral: (ast) => parseDatetimeLiteral(ast),
    __parseValue: (value) => moment.utc(value).format('Y-MM-DD'),
    __serialize: (value) => value
  },
  JSON: {
    __parseLiteral: (ast) => parseJSONLiteral(ast),
    __parseValue: (value) => value,
    __serialize: (value) => value
  },
  Timestamp: {
    __parseLiteral: (ast) => parseDatetimeLiteral(ast),
    __parseValue: (value) => moment.utc(value).format(),
    __serialize: (value) => value
  }
};
