const inlineCss = require('inline-css');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const templates = require('daily-templates');

const blurbToComponent = (type, data) => {
  const templateName = Object.keys(templates).find(tpl => tpl.toLowerCase() === type);
  const Template = templates[templateName];
  return (Template) ? React.createElement(Template, data) : '';
};

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
  data: blurbData.data
});

const htmlForEdition = ({id, cssHref, subject}, blurbs) => {
  if (!blurbs) throw new Error(`Could not render edition with id: ${id} - it has no blurbs`);

  // Sort blurbs based on position
  blurbs.sort((a, b) => a.position - b.position);

  // Convert blurbs to React components
  const blurbComponents = blurbs.map(blurb => blurbToComponent(blurb.type, blurb.data));

  // Stuff components in email shell component and add DOCTYPE
  return Promise.all(blurbComponents)
  .then(components => {
    const emailComponent = React.createElement(templates.Email, { cssHref, subject }, components);
    const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
    const staticMarkup = ReactDOMServer.renderToStaticMarkup(emailComponent);
    return doctype + staticMarkup;
  });
};

const editionModel = {
  createEdition ({ id, approvedAt, cssHref, publishDate, subject }, { knex }) {
    return knex.insert({
      edition_id: id,
      approved_at: approvedAt,
      css_href: cssHref,
      publish_on: publishDate,
      subject
    }).into('editions').returning('*')
    .then(editionData => formatEditionData(editionData[0]))
    .catch(error => {
      if (error.constraint === 'editions_pkey') throw new Error(`Edition already exists with id: ${id}`);
      throw error;
    });
  },
  findEdition ({ id, publishDate }, { knex }) {
    if (!(id || publishDate)) throw new Error('A valid id or publishDate is required to find an edition');
    const where = id ? { edition_id: id } : { publish_on: publishDate };
    return knex.select('*').from('editions').where(where)
    .then(editionData => {
      if (!editionData.length) throw new Error(`No edition found for ${id ? 'id: ' + id : 'publishDate: ' + publishDate}`);
      return formatEditionData(editionData[0]);
    });
  },
  findBlurbsForEdition (editionId, { knex }) {
    return knex.select('*').from('blurbs').where({ edition_id: editionId }).orderBy('position', 'asc')
    .then(blurbsData => blurbsData.map(blurbData => formatBlurbData(blurbData)));
  },
  renderHTMLForEdition (edition, { knex }) {
    return this.findBlurbsForEdition(edition.id, {knex})
    .then(blurbs => htmlForEdition(edition, blurbs))
    .then(html => inlineCss(html, { url: 'filePath' }));
  },
  updateEdition (id, { approvedAt, cssHref, publishDate, subject }, { knex }) {
    return knex('editions').update({
      approved_at: approvedAt,
      css_href: cssHref,
      publish_on: publishDate,
      subject
    }).where({ edition_id: id }).returning('*')
    .then(editionData => formatEditionData(editionData[0]));
  },
};

module.exports = editionModel;
