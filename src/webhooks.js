const express = require('express');
const router = express.Router();
const model = require('./models');

module.exports = (app) => {

  router.post('/postmark/open', (req, res) => {
    const knex = req.app.get('knex');
    const { DeliveredAt: deliveredAt, MessageID: id } = req.body;
    model.messageDelivered(id, deliveredAt).then(res.send(200);
  });

};

module.exports = router;
