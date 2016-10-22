const inlineCss = require('inline-css');
const Promise = require('bluebird');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const templates = require('daily-templates');

module.exports = class Email {

  static blurbToHTML ({blurb_type, data}) {
    const templateName = Object.keys(templates).find(tpl => tpl.toLowerCase() === blurb_type);
    const Template = templates[templateName];
    let staticMarkup = '';
    if (Template) {
      staticMarkup = ReactDOMServer.renderToStaticMarkup(React.createElement(Template, data));
    }
    return staticMarkup;
  }

  static htmlForEdition (edition) {
    if (!edition.blurbs) return '';

    // Sort blurbs based on position
    edition.blurbs.sort((a, b) => a.position - b.position);

    // Convert blurbs to HTML snippets
    // TODO: Use Promise.join() with a spread operator(?)
    return Promise.all(edition.blurbs.map(blurb => this.blurbToHTML(blurb)))
    .then(blurbs => blurbs.join(''));// {
      // Inject blurb snippets into main email template
      // return templates('body', {
      //   css_href: edition.css_href,
      //   content: blurbs.join('')
      // })
      // .then(html => inlineCss(html, { url: 'filePath' }));
    // });
  }

};
