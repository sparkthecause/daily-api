'use strict';

const express = require('express');
const router = new express.Router();
const moment = require('moment');
const business = require('moment-business');
const EditionHandler = require('../api/handlers/edition');
const EmailHelper = require('../api/helpers/email');

const today = () => moment().format('YYYY-MM-DD');
const nextWeekDay = (date) => business.addWeekDays(moment(date), 1);
const prevWeekDay = (date) => business.subtractWeekDays(moment(date), 1);

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
        nextDay: nextWeekDay(publishDate).format('YYYY-MM-DD'),
        prevDay: prevWeekDay(publishDate).format('YYYY-MM-DD')
      });

    })
    .catch(() => {

      res.render('archive', {
        errorMessage: 'No edition found for that date.',
        date: moment(publishDate).format('MMM Do'),
        nextDay: nextWeekDay(publishDate).format('YYYY-MM-DD'),
        prevDay: prevWeekDay(publishDate).format('YYYY-MM-DD')
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
