'use strict';

const Mustache = require('mustache');
const Promise = require('bluebird');
const request = require('request-promise');
const config = require('../../config');

module.exports = class Email {

  static blurbToHTML(blurb) {

    return request(`${config.cdn}/blurbs/${blurb.blurb_type_id}.mustache`)
    .then(template => Mustache.render(template, blurb));

  }

  static htmlForEdition(edition) {

    // Sort blurbs based on priority
    edition.blurbs.sort((a, b) => a.priority - b.priority);

    // Convert blurbs to HTML snippets
    return Promise.all(edition.blurbs.map(blurb => this.blurbToHTML(blurb)))
    .then(blurbs => {

      // Inject blurb snippets into main email template
      return request(`${config.cdn}/templates/email.mustache`)
      .then(template => Mustache.render(template, {
        content: blurbs.join('')
      }));
      // return edition;

    });

  }

};

// DONE: Rank and loop through blurbs ( Header -> Blurbs -> Footer )
// Inject content
// Inline CSS
// Compress and inline images
// Remove whitespace / minify(?)
