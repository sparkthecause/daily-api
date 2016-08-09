const Mustache = require('mustache');
const Promise = require('bluebird');
const inlineCss = require('inline-css');
const readFile = Promise.promisify(require('fs').readFile);
const config = require('../../config');

module.exports = class Email {

  static blurbToHTML (blurb) {
    blurb.cdn = config.cdn;
    return readFile(`${__dirname}/../../templates/blurbs/${blurb.blurb_type_id}.mustache`, 'utf8')
    .then(template => Mustache.render(template, blurb));
  }

  static htmlForEdition (edition) {
    if (!edition.blurbs) return '';

    // Sort blurbs based on priority
    edition.blurbs.sort((a, b) => a.priority - b.priority);

    // Convert blurbs to HTML snippets
    return Promise.all(edition.blurbs.map(blurb => this.blurbToHTML(blurb)))
    .then(blurbs => {
      // Inject blurb snippets into main email template
      return readFile(`${__dirname}/../../templates/editions/email.mustache`, 'utf8')
      .then(template => Mustache.render(template, {
        cdn: config.cdn,
        content: blurbs.join('')
      }))
      .then(html => inlineCss(html, { url: 'filePath' }));
    });
  }

};
