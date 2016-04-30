'use strict';

const Mustache = require('mustache');
const Promise = require('bluebird');
const readFile = Promise.promisify(require('fs').readFile);
const path = require('path');

module.exports = class Email {

  static blurbToHTML(blurb) {

    const templatesPath = `${path.dirname(require.main.filename)}/email/components`;

    return readFile(`${templatesPath}/title.mustache`, { encoding: 'utf-8' })
    .then(template => Mustache.render(template, blurb));

  }

  static htmlForEdition(edition) {

    // Sort blurbs based on priority
    edition.blurbs.sort((a, b) => a.priority - b.priority);

    // Convert blurbs to HTML snippets
    return Promise.all(edition.blurbs.map(blurb => this.blurbToHTML(blurb)))
    .then(blurbs => {

      // Inject blurb snippets into main email template
      const templatePath = `${path.dirname(require.main.filename)}/email/email.mustache`;
      return readFile(templatePath, { encoding: 'utf-8' })
      .then(template => Mustache.render(template, {
        content: blurbs.join('')
      }));
      // return edition;

    });

  }

};

// Rank and loop through blurbs
// Header -> Blurbs -> Footer
// Inject content
// Inline CSS
// Compress and inline images
// Remove whitespace / minify(?)
