const formatEditionData = (editionData) => ({
  id: editionData.edition_id,
  publishOn: editionData.publish_on,
  subject: editionData.subject,
  css: editionData.css_href,
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
  }
};

module.exports = editionModel;
