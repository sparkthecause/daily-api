const formatBlurbData = (blurbData) => ({
  id: blurbData.blurb_id,
  position: blurbData.position,
  approvedAt: blurbData.approved_at,
  type: blurbData.blurb_type,
  data: blurbData.data
});

const uploadImageForBlurb = (id, data, extension, { config, s3 }) => {
  const fileName = `${id}.${extension}`;
  return s3.upload(`blurbs/${fileName}`, data)
  .then(({ ETag }) => ETag && `${config.cdn}/blurbs/${fileName}`);
};

const extensionFromDataURI = (dataURI) => {
  const extRegex = /[^data:image/]\w+[\w\W]+?(?=;)/;
  const matches = extRegex.exec(dataURI);
  return (matches) ? matches[0] : null;
};

const CDNifySrcData = (id, data, { config, s3 }) => {
  if (data.hasOwnProperty('srcData')) {
    const fileData = Buffer.from(data.srcData.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const extension = extensionFromDataURI(data.srcData);
    return uploadImageForBlurb(id, fileData, extension, { s3, config })
    .then(url => {
      const dataWithUrls = Object.assign({ src: url }, data);
      delete dataWithUrls['srcData'];
      return dataWithUrls;
    });
  }
  return Promise.resolve(data);
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
    return CDNifySrcData(id, data, { config, s3 })
    .then(uploadedData => knex('blurbs').update({ data: uploadedData }).where({ blurb_id: id }).returning('*'))
    .then(blurbData => formatBlurbData(blurbData[0]));
  },
  uploadImageForBlurb
};

module.exports = blurbModel;
