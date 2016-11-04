const Promise = require('bluebird');
const EmailHelper = require('../helpers/email');

module.exports = class Edition {

  constructor (app) {
    this.config = app.get('config');
    this.knex = app.get('knex');
  }

  editionForID (id) {
    return this.knex.select('*').from('editions').where({ edition_id: id })
    .then(data => {
      if (!data.length) throw new Error(`No edition found for id: ${id}`);
      const editionData = data[0];
      return {
        id: editionData.edition_id,
        publishOn: editionData.publish_on,
        subject: editionData.subject,
        css: editionData.css_href,
        approvedAt: editionData.approved_at
      };
    });
  }

  blurbsForEditionID(editionId) {
    return this.knex.select('*').from('blurbs').where({ edition_id: editionId }).orderBy('position', 'asc')
    .then(data => {
      console.log(data);
      if (!data.length) throw new Error(`No edition found for id: ${id}`);
      return data.map(blurbData => ({
        id: blurbData.blurb_id,
        position: blurbData.position,
        approvedAt: blurbData.approved_at,
        type: blurbData.blurb_type,
        data: JSON.stringify(blurbData.data)
      }));
    });
  }

  editionForDate (publishDate) {
    const editionsSubquery = this.knex.select('edition_id').from('editions').where({ publish_on: publishDate });

    const editionsPromise = this.knex.select().from('editions').where({ publish_on: publishDate });
    const blurbsPromise = this.knex.select().from('blurbs').where('edition_id', 'in', editionsSubquery).orderBy('position', 'asc');

    return Promise.join(editionsPromise, blurbsPromise, (editions, blurbs) => {
      if (editions.length < 1) throw Error('404');

      for (const edition of editions) {
        edition.blurbs = blurbs;
      }

      // Pick a random version of the edition - for A/B testing
      const editionIndex = Math.floor(Math.random() * (editions.length));
      return editions[editionIndex];
    });
  }

  editionHTMLforDate (publishDate) {
    return this.editionForDate(publishDate)
    .then(edition => EmailHelper.htmlForEdition(edition));
  }

};
