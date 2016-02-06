'use strict';

module.exports = class Subscriber {

  constructor( app ) {
    this.config = app.get( 'config' );
    this.knex = app.get( 'knex' );
  }

}
