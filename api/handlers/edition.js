const Promise = require('bluebird');
const EmailHelper = require('../helpers/email');

module.exports = class Edition {

  constructor (app) {
    this.config = app.get('config');
    this.knex = app.get('knex');
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
