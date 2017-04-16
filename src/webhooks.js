const express = require('express');
const router = express.Router();
const model = require('./models');

// {
//   "ID": 42,
//   "Type": "HardBounce",
//   "TypeCode": 1,
//   "Name": "Hard bounce",
//   "Tag": "Test",
//   "MessageID": "883953f4-6105-42a2-a16a-77a8eac79483",
//   "ServerId": 23,
//   "Description": "The server was unable to deliver your message (ex: unknown user, mailbox not found).",
//   "Details": "Test bounce details",
//   "Email": "john@example.com",
//   "From": "sender@example.com",
//   "BouncedAt": "2014-08-01T13:28:10.2735393-04:00",
//   "DumpAvailable": true,
//   "Inactive": true,
//   "CanActivate": true,
//   "Subject": "Test subject"
// }

// router.post('/postmark/bounced', (req, res) => {
//   const context = req.app.get('context');
//   const { DeliveredAt: deliveredAt, Type: bounceTypeId } = req.body;
//   model.messageBounced(id, deliveredAt, context).then(res.sendStatus(200));
// });

router.post('/postmark/delivered', (req, res) => {
  const context = req.app.get('context');
  const { DeliveredAt: deliveredAt, MessageID: id } = req.body;
  model.messageDelivered(id, deliveredAt, context).then(res.sendStatus(200));
});

// {
//   "FirstOpen": true,
//   "Client": {
//     "Name": "Chrome 35.0.1916.153",
//     "Company": "Google",
//     "Family": "Chrome"
//   },
//   "OS": {
//     "Name": "OS X 10.7 Lion",
//     "Company": "Apple Computer, Inc.",
//     "Family": "OS X 10"
//   },
//   "Platform": "WebMail",
//   "UserAgent": "Mozilla\/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/35.0.1916.153 Safari\/537.36",
//   "ReadSeconds": 5,
//   "Geo": {
//     "CountryISOCode": "RS",
//     "Country": "Serbia",
//     "RegionISOCode": "VO",
//     "Region": "Autonomna Pokrajina Vojvodina",
//     "City": "Novi Sad",
//     "Zip": "21000",
//     "Coords": "45.2517,19.8369",
//     "IP": "188.2.95.4"
//   },
//   "MessageID": "883953f4-6105-42a2-a16a-77a8eac79483",
//   "ReceivedAt": "2014-06-01T12:00:00",
//   "Tag": "welcome-email",
//   "Recipient": "john@example.com"
// }

// router.post('/postmark/opened', (req, res) => {
//   const context = req.app.get('context');
//   const { DeliveredAt: deliveredAt, MessageID: id } = req.body;
//   model.messageOpened(id, deliveredAt, context).then(res.sendStatus(200));
// });

module.exports = router;
