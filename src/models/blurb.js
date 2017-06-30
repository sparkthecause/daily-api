const fs = require('fs');
const mime = require('mime-types');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const deleteFile = util.promisify(fs.unlink);

const formatBlurbData = (blurbData) => ({
  id: blurbData.blurb_id,
  position: blurbData.position,
  approvedAt: blurbData.approved_at,
  type: blurbData.blurb_type,
  data: blurbData.data
});

const uploadImageForBlurb = (id, file, { config, s3 }) => {
  const extension = mime.extension(file.type);
  const fileName = `blurbs/${id}.${extension}`;
  return readFile(file.path)
  .then(data => new Buffer(data, 'binary'))
  .then(base64Data => s3.upload(fileName, base64Data))
  .then(etag => deleteFile(file.path).then(() => `${config.cdn}/${fileName}`));
};

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
  repositionBlurb (id, { position }, { knex }) {
    return knex('blurbs').update({ position }).where({ blurb_id: id }).returning('*')
    .then(blurbData => formatBlurbData(blurbData[0]));
  },
  repositionBlurbs (blurbPositions, { knex }) {
    return blurbPositions.map(({ id, position }) => knex('blurbs')
      .update({ position }).where({ blurb_id: id }).returning('*')
      .then(blurbData => formatBlurbData(blurbData[0]))
    );
  },
  updateBlurbData (id, { data }, { config, knex, s3 }) {
    return knex('blurbs').update({ data }).where({ blurb_id: id }).returning('*')
    .then(blurbData => formatBlurbData(blurbData[0]));
  },
  uploadImageForBlurb
};

module.exports = blurbModel;
