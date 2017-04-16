const merge = require('merge');

const blurbModel = require('./blurb');
const editionModel = require('./edition');
const messageModel = require('./message');
const subscriberModel = require('./subscriber');

module.exports = merge.recursive(true,
  blurbModel,
  editionModel,
  messageModel,
  subscriberModel
);
