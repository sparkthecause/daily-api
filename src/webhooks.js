const express = require('express');
const router = express.Router();
const model = require('./models');

router.post('/postmark/delivered', (req, res) => {
  const context = req.app.get('context');
  const { DeliveredAt: deliveredAt, MessageID: id } = req.body;
  model.messageDelivered(id, deliveredAt, context).then(res.sendStatus(200));
});

module.exports = router;
