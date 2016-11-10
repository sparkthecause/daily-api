const merge = require('merge');

const blurbModel = require('./blurb');
const editionModel = require('./edition');
const subscriberModel = require('./subscriber');

module.exports = merge.recursive(true,
  blurbModel,
  editionModel,
  subscriberModel
);
