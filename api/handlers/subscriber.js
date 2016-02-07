'use strict';

module.exports = class Subscriber {

  constructor( app ) {
    this.config = app.get( 'config' );
    this.knex = app.get( 'knex' );
  }

  newSubscriberWithEmail(email) {

    return this.knex.insert({"email_address": email}).into('subscribers').returning('*')
    .then( subscribers => {

      return subscribers[0];

    })
    .catch( error => {

      if (error.constraint === "subscribers_email_address_key") {
        throw new Error('email already exists');
      } else {
        return error;
      }

    });

  }

};
