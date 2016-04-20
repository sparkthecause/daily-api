'use strict';

const Mustache = require('mustache');

module.exports = class Email {

  static htmlForEdition(edition) {

    return Mustache.render('{{edition_id}}', edition);

  }

};
