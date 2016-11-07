const formatBlurbData = (blurbData) => ({
  id: blurbData.blurb_id,
  position: blurbData.position,
  approvedAt: blurbData.approved_at,
  type: blurbData.blurb_type,
  data: blurbData.data
});

const blurbModel = {
  createBlurb ({ id, approvedAt, data, position, type }, { knex }) {
    return knex.insert({
      blurb_id: id,
      approved_at: approvedAt,
      blurb_type: type,
      position,
      data
    }).into('blurbs').returning('*')
    .then(blurbData => formatBlurbData(blurbData[0]))
    .catch(error => {
      if (error.constraint === 'blurbs_pkey') throw new Error(`Blurb already exists with id: ${id}`);
      throw error;
    });
  },
  updateBlurb (id, { approvedAt, data, position }, { knex }) {
    return knex('editions').update({
      approved_at: approvedAt,
      position,
      data
    }).where({ blurb_id: id }).returning('*')
    .then(blurbData => formatBlurbData(blurbData[0]))
  }
};

module.exports = blurbModel;
