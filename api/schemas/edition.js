const EditionHandler = require('../handlers/edition');

exports.schema = `
  type Edition {
    id: ID
    publishOn: String
    subject: String
    css: String
    approvedAt: String
    blurbs: [Blurb]
  }

  type Blurb {
    id: ID
    position: Int
    approvedAt: String
    type: String
    data: String
  }
`;

exports.resolvers = (app) => {

  const editionHandler = new EditionHandler(app);
  return {
    Edition: {
      blurbs({id}, context) {
        return editionHandler.blurbsForEditionID(id);
      }
    }
  };
}
