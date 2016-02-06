'use strict';

const router = require('express').Router();
const moment = require('moment');
require('moment-business'); // modifies moment
const EditionHandler = require('../api/handlers/edition');

const today = () => moment().format('YYYY-MM-DD');
const nextWeekDay = (date) => moment(date).addWeekDays(1).format('YYYY-MM-DD');
const prevWeekDay = (date) => moment(date).subtractWeekDays(1).format('YYYY-MM-DD');

module.exports = app => {

  const knex = app.get('knex');
  const editionHandler = new EditionHandler( app );

  app.get('/', (req, res) => {
    res.render('home');
  });

  router.route('/archive')
  .get((req, res) => {

    const publishDate = req.query.date || today();

    editionHandler.editionForDate(publishDate)
    .then( result => {

      res.render('archive', {
        "daily": result,
        "date": moment(publishDate).format('MMM Do'),
        "nextDay": nextWeekDay(publishDate),
        "prevDay": prevWeekDay(publishDate)
      });

    })
    .catch( error => {

      res.render('archive', {
        "errorMessage": "No edition found for that date.",
        "date": moment(publishDate).format('MMM Do'),
        "nextDay": nextWeekDay(publishDate),
        "prevDay": prevWeekDay(publishDate)
      });

    });

  });

  return router;

};
