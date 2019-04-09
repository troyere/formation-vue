const express = require('express');
const config = require('./config.json');

const app = express();

// Add body-parser
app.use(require('body-parser').json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// Add Shows API
require('./shows-api')(app);

app.listen(config.port, 'localhost', (err) => {
  if (err) {
    console.error(err);
  }

  console.info(`Rest Server listening on : http://localhost:${config.port}`);
});