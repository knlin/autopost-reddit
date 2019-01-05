const express      = require('express');
const path         = require('path');
const bodyParser   = require('body-parser');
const QuerySender  = require('./query-sender.js');

const EXAMPLE_RESULTS = require('./utils/sql/example_results.json');

const app = express();
const PORT = process.env.PORT || 5000;

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// app.use('/static', express.static('public'));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// query route
app.get('/api/query', jsonParser, function (req, res) {
  if (!req.query) {
    console.log("Query is malformed.");
    console.log(req.query);
    return res.sendStatus(400);
  }
  console.log(req.query);
  QuerySender
    .queryBQ(req.query.subreddit, req.query.months, req.query.score, req.query.timezone)
    .then(rows => {
      res.send(rows);  // TODO: send rows to React frontend to render visualization
      console.log("Sent JSON array to client.")
    })
    .catch(e => {
      console.log("Error: ", e);
      // send default data (subreddit=animemes, months=2, score=1000)
      console.log(req.body);
      res.send(QuerySender.splitRows(EXAMPLE_RESULTS));
    });
});

// test route
app.get('/api/test', (req, res) => {
  res.send('Hello from Express!');
  console.log("Hello from Express!");
});

// main route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// 404 route
app.use(function (req, res, next) {
  res.status(404).send("This isn't the page you're looking for.")
});

// error route
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Oops, something broke!');
});

// Listen to the App Engine-specified port, or 5000 otherwise
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
