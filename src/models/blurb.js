const formatBlurbData = (blurbData) => ({
  id: blurbData.blurb_id,
  position: blurbData.position,
  approvedAt: blurbData.approved_at,
  type: blurbData.blurb_type,
  data: blurbData.data
});

const blurbModel = {
  approveBlurb (id, { knex }) {
    return knex('blurbs').update({ approved_at: knex.fn.now() }).where({ blurb_id: id }).returning('*')
    .then(blurbData => formatBlurbData(blurbData[0]));
  },
  createBlurb ({ id, data, editionId, position, type }, { knex }) {
    return knex.insert({
      blurb_id: id,
      blurb_type: type,
      edition_id: editionId,
      position,
      data
    }).into('blurbs').returning('*')
    .then(blurbData => formatBlurbData(blurbData[0]))
    .catch(error => {
      if (error.constraint === 'blurbs_pkey') throw new Error(`Blurb already exists with id: ${id}`);
      throw error;
    });
  },
  repositionBlurbs (blurbPositions, { knex }) {
    return blurbPositions.map(({ id, position }) => knex('blurbs')
      .update({ position }).where({ blurb_id: id }).returning('*')
      .then(blurbData => formatBlurbData(blurbData[0]))
    );
  },
  updateBlurb (id, { data, position }, { knex }) {
    return knex('blurbs').update({ position, data }).where({ blurb_id: id }).returning('*')
    .then(blurbData => formatBlurbData(blurbData[0]));
  }
};

module.exports = blurbModel;
