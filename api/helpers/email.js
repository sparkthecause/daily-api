const Promise = require('bluebird');
const inlineCss = require('inline-css');
const templates = require('daily-templates');

module.exports = class Email {

  static blurbToHTML (blurb) {
    return templates(blurb.blurb_type, blurb.data);
  }

  static htmlForEdition (edition) {
    if (!edition.blurbs) return '';

    // Sort blurbs based on position
    edition.blurbs.sort((a, b) => a.position - b.position);

    // Convert blurbs to HTML snippets
    // TODO: Use Promise.join() with a spread operator(?)
    return Promise.all(edition.blurbs.map(blurb => this.blurbToHTML(blurb)))
    .then(blurbs => {
      // Inject blurb snippets into main email template
      return templates('body', {
        css_href: edition.css_href,
        content: blurbs.join('')
      })
      .then(html => inlineCss(html, { url: 'filePath' }));
    });
  }

};
