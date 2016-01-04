"use strict";

const app = require('express')();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

let server = app.listen(3000);
