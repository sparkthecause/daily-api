const Promise = require('bluebird');
const inlineCss = require('inline-css');
const templates = require('daily-templates');
const config = require('../../config');

module.exports = class Email {

  static blurbToHTML (blurb) {
    blurb.cdn = config.cdn;
    return templates(blurb.blurb_type, blurb);
  }

  static htmlForEdition (edition) {
    if (!edition.blurbs) return '';

    // Sort blurbs based on priority
    edition.blurbs.sort((a, b) => a.priority - b.priority);

    // Convert blurbs to HTML snippets
    return Promise.all(edition.blurbs.map(blurb => this.blurbToHTML(blurb)))
    .then(blurbs => {
      // Inject blurb snippets into main email template
      return templates('body-default', {
        cdn: config.cdn,
        content: blurbs.join('')
      })
      .then(html => inlineCss(html, { url: 'filePath' }));
    });
  }

};
