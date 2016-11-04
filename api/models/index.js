const merge = require('merge');

const editionModel = require('./edition');
const subscriberModel = require('./subscriber');

module.exports = merge.recursive(true,
  editionModel,
  subscriberModel
);
