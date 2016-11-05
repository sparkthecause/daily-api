const inlineCss = require('inline-css');
const Promise = require('bluebird');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const templates = require('daily-templates');

const blurbToComponent = (type, data) => {
  const templateName = Object.keys(templates).find(tpl => tpl.toLowerCase() === type);
  const Template = templates[templateName];
  return (Template) ? React.createElement(Template, data) : '';
}

const htmlForEdition = ({id, cssHref, subject}, blurbs) => {
  if (!blurbs) throw new Error(`Could not render edition with id: ${id} - it has no blurbs`);

  // Sort blurbs based on position
  blurbs.sort((a, b) => a.position - b.position);

  // Convert blurbs to React components
  const blurbComponents = blurbs.map(blurb => blurbToComponent(blurb.type, JSON.parse(blurb.data)));
  return Promise.join(...blurbComponents)
  .then(components => {
    const emailComponent = React.createElement(templates.Email, { cssHref, subject }, components);
    const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
    const staticMarkup = ReactDOMServer.renderToStaticMarkup(emailComponent);
    return doctype + staticMarkup;
  });
}

const formatEditionData = (editionData) => ({
  id: editionData.edition_id,
  publishOn: editionData.publish_on,
  subject: editionData.subject,
  cssHref: editionData.css_href,
  approvedAt: editionData.approved_at
});

const formatBlurbData = (blurbData) => ({
  id: blurbData.blurb_id,
  position: blurbData.position,
  approvedAt: blurbData.approved_at,
  type: blurbData.blurb_type,
  data: JSON.stringify(blurbData.data)
});

const editionModel = {
  findEdition(id, {knex}) {
    return knex.select('*').from('editions').where({ edition_id: id })
    .then(data => {
      if (!data.length) throw new Error(`No edition found for id: ${id}`);
      return formatEditionData(data[0]);
    });
  },
  findBlurbsForEdition(editionId, {knex}) {
    return knex.select('*').from('blurbs').where({ edition_id: editionId }).orderBy('position', 'asc')
    .then(data => data.map(blurbData => formatBlurbData(blurbData)));
  },
  renderHTMLForEdition(edition, {knex}) {
    return this.findBlurbsForEdition(edition.id, {knex})
    .then(blurbs => htmlForEdition(edition, blurbs))
    .then(html => inlineCss(html, { url: 'filePath' }));
  }
};

module.exports = editionModel;
