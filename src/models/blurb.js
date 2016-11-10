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
  createBlurb ({ id, data, position, type }, { knex }) {
    return knex.insert({
      blurb_id: id,
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
  updateBlurb (id, { data, position }, { knex }) {
    return knex('blurbs').update({ position, data }).where({ blurb_id: id }).returning('*')
    .then(blurbData => formatBlurbData(blurbData[0]));
  }
};

module.exports = blurbModel;
