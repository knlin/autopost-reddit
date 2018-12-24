const express      = require('express');
const bodyParser   = require('body-parser');
const QueryBuilder = require('../utils/query-builder.js');
const QuerySender  = require('../utils/query-sender.js');

const app = express();
const PORT = process.env.PORT || 3000;

// create application/json parser
const jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// main endpoint
app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

// query endpoint
app.get('/query', jsonParser, function (req, res) {
  if (!req.body || !req.query || !req.query.subreddit) {
    return res.sendStatus(400);
  }
  QuerySender
    .queryBQ(req.query.subreddit, numMonths, req.query.minscore)
    .then(rows => {
      res.send(rows);  // TODO: send rows to React frontend to render visualization
    })
    .catch(e => {
      console.log("Error: ", e);
    });
});

// Listen to the App Engine-specified port, or 3000 otherwise
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
