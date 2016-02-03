'use strict';

module.exports = class Archive {
  constructor( app ) {
    this.config = app.get( 'config' );
    this.knex = app.get( 'knex' );
  }

  editionForDate( publishDate ) {

    // const publishDate = '2016-02-01';
    return this.knex.select().from('editions').where({'publish_on': publishDate})
    .then( rows => {

      if (rows.length < 1) throw error('404');

      return rows[0];

    });

  }

}
