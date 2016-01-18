"use strict";

const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

if ( process.env.NODE_ENV === "production" || require("piping")() ) {

  app.disable( 'x-powered-by' );

  // Redirect non-HTTPS traffic in production
  if ( process.env.NODE_ENV === 'production' ) {

    const enforce = require('express-sslify');
    // Disable until we buy the SSL addon
    // app.use( enforce.HTTPS({ trustProtoHeader: true }) );

  }

  const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
  });

  app.engine('hbs', hbs.engine);

  app.set('view engine', 'hbs');

  app.use(express.static('assets'));

  app.get('/', function (req, res) {
    res.render('home');
  });

  app.get('/archive', function (req, res) {
    res.render('archive', {
      "daily": {
        "edition_id": "lkw4enr385dsad7324",
        "published_on": "2016-01-07",
        "subject": "And so it begins...",
        "contents": [{
          "content_id": "asfkjhi6wwe",
          "priority": 0,
          "edition_id": "lkw4enr385dsad7324",
          "is_approved": 1,
          "content_type": 4,
          "title": "Title!",
          "images": {
            "main": {
              "image_id": "h48dhfker8",
              "src": "https://cdn.sparkthecause.com",
              "href": "http://ellen.tv"
            }
          },
          "descprition_html": "<p>We love you</p>"
        }]
      }
    });
  });

  const server = app.listen(process.env.PORT || 3000);

}
