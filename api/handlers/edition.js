const Promise = require('bluebird');
const EmailHelper = require('../helpers/email');

module.exports = class Edition {

  constructor (app) {
    this.config = app.get('config');
    this.knex = app.get('knex');
  }

  editionForDate (publishDate) {
    const editionsSubquery = this.knex.select('edition_id').from('editions').where({ publish_on: publishDate });
    const blurbsSubquery = this.knex.select('blurb_id').from('editions').where({ publish_on: publishDate });

    const editionsPromise = this.knex.select().from('editions').where({ publish_on: publishDate });
    const blurbsPromise = this.knex.select().from('blurbs').where('edition_id', 'in', editionsSubquery).orderBy('priority', 'asc');
    const imagesPromise = this.knex.select().from('images').where('blurb_id', 'in', blurbsSubquery).orderBy('position', 'asc');

    return Promise.join(editionsPromise, blurbsPromise, imagesPromise, (editions, blurbs, images) => {
      if (editions.length < 1) throw Error('404');

      for (const edition of editions) {
        edition.blurbs = blurbs;
        for (const blurb of edition.blurbs) {
          blurb.images = images;
        }
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
