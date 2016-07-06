'use strict';

const express = require('express');
const router = new express.Router();
const moment = require('moment');
require('moment-business'); // modifies moment
const EditionHandler = require('../api/handlers/edition');
const EmailHelper = require('../api/helpers/email');

const today = () => moment().format('YYYY-MM-DD');
const nextWeekDay = (date) => moment(date).addWeekDays(1).format('YYYY-MM-DD');
const prevWeekDay = (date) => moment(date).subtractWeekDays(1).format('YYYY-MM-DD');

module.exports = app => {

  const editionHandler = new EditionHandler(app);

  app.get('/', (req, res) => res.render('home'));

  router.route('/archive')
  .get((req, res) => {

    const publishDate = req.query.date || today();

    editionHandler.editionForDate(publishDate)
    .then(edition => EmailHelper.htmlForEdition(edition))
    .then(html => {

      res.render('archive', {
        daily: html,
        date: moment(publishDate).format('MMM Do'),
        nextDay: nextWeekDay(publishDate),
        prevDay: prevWeekDay(publishDate)
      });

    })
    .catch(() => {

      res.render('archive', {
        errorMessage: 'No edition found for that date.',
        date: moment(publishDate).format('MMM Do'),
        nextDay: nextWeekDay(publishDate),
        prevDay: prevWeekDay(publishDate)
      });

    });

  });

  app.get('/unsubscribe', (req, res) => {

    res.render('unsubscribe', {
      id: req.query.id
    });

  });

  return router;

};
