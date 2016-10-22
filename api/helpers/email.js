const inlineCss = require('inline-css');
const Promise = require('bluebird');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const templates = require('daily-templates');

module.exports = class Email {

  static blurbToComponent ({blurb_type, data}) {
    const templateName = Object.keys(templates).find(tpl => tpl.toLowerCase() === blurb_type);
    const Template = templates[templateName];
    return (Template) ? React.createElement(Template, data) : '';
  }

  static htmlForEdition (edition) {
    if (!edition.blurbs) return '';

    // Sort blurbs based on position
    edition.blurbs.sort((a, b) => a.position - b.position);

    // Convert blurbs to React components
    const blurbComponents = edition.blurbs.map(blurb => this.blurbToComponent(blurb));
    return Promise.join(...blurbComponents)
    .then(blurbs => {

      const emailComponent = React.createElement(templates.Email, {
        cssHref: edition.css_href,
        subject: edition.subject
      }, blurbs);

      const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
      const staticMarkup = ReactDOMServer.renderToStaticMarkup(emailComponent);
      return doctype + staticMarkup;

    })
    .then(html => inlineCss(html, { url: 'filePath' }));
  }

};
