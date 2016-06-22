'use strict';

const Promise = require('bluebird');
const validator = require('validator');

module.exports = class Subscriber {

  constructor(app) {

    this.config = app.get('config');
    this.knex = app.get('knex');

  }

  fetchActiveSubscribers() {

    // check for an invalid
    return this.knex.select('subscriber_id', 'email_address').from('subscribers').whereNull('unsubscribed_at');
    // .catch(error => {
    //
    //   // if the email is already in the db, throw an error
    //   if (error.constraint === 'subscribers_email_address_key') throw new Error('email is in use');
    //
    //   // if all else fails, throw the raw error
    //   throw error;
    //
    // });

  }

  newSubscriberWithEmail(email) {

    // check for an invalid email address
    if (!email || !validator.isEmail(email)) return Promise.reject(new Error('email is invalid'));

    return this.knex.insert({ email_address: email }).into('subscribers').returning('*')
    .then(subscribers => {

      // return the subscriber record in full
      return subscribers[0];

    })
    .catch(error => {

      // if the email is already in the db, throw an error
      if (error.constraint === 'subscribers_email_address_key') throw new Error('email is in use');

      // if all else fails, throw the raw error
      throw error;

    });

  }

  unsubscribe(subscriberID) {

    // check for an invalid email address
    if (!subscriberID) return Promise.reject(new Error('subscriberID is invalid'));

    return this.knex.delete().from('subscribers').where({ subscriber_id: subscriberID })
    .then(result => {

      // return the subscriber record in full
      return result;

    })
    .catch(error => {

      // if the email is already in the db, throw an error
      if (error.constraint === 'subscribers_email_address_key') throw new Error('email is in use');

      // if all else fails, throw the raw error
      throw error;

    });

  }

};
