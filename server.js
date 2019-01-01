const express      = require('express');
const path         = require('path');
const bodyParser   = require('body-parser');
const QuerySender  = require('./utils/query-sender.js');

const app = express();
const PORT = process.env.PORT || 5000;

// create application/json parser
const jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// app.use('/static', express.static('public'));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// main route
app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

// query route
app.get('/api/query', jsonParser, function (req, res) {
  if (!req.query) {
    console.log("Query is malformed.");
    console.log(req.query);
    return res.sendStatus(400);
  }
  console.log(req.query);
  QuerySender
    .queryBQ(req.query.subreddit, req.query.months, req.query.score)
    .then(rows => {
      res.send(rows);  // TODO: send rows to React frontend to render visualization
      console.log("Sent JSON array to client.")
    })
    .catch(e => {
      console.log("Error: ", e);
      // send default data (subreddit=animemes, months=2, score=1000)
      console.log(req.body);
      res.send([{"dow":1,"bucket":0.5,"freq":1},{"dow":1,"bucket":1.5,"freq":1},{"dow":1,"bucket":3,"freq":2},{"dow":1,"bucket":4.5,"freq":1},{"dow":1,"bucket":5,"freq":1},{"dow":1,"bucket":7,"freq":1},{"dow":1,"bucket":8,"freq":1},{"dow":1,"bucket":8.5,"freq":2},{"dow":1,"bucket":9.5,"freq":1},{"dow":1,"bucket":10.5,"freq":3},{"dow":1,"bucket":12,"freq":1},{"dow":1,"bucket":12.5,"freq":3},{"dow":1,"bucket":13,"freq":2},{"dow":1,"bucket":13.5,"freq":3},{"dow":1,"bucket":14,"freq":1},{"dow":1,"bucket":15,"freq":1},{"dow":1,"bucket":15.5,"freq":2},{"dow":1,"bucket":16,"freq":4},{"dow":1,"bucket":16.5,"freq":1},{"dow":1,"bucket":17.5,"freq":2},{"dow":1,"bucket":18,"freq":7},{"dow":1,"bucket":18.5,"freq":1},{"dow":1,"bucket":23.5,"freq":1},{"dow":2,"bucket":0.5,"freq":1},{"dow":2,"bucket":1,"freq":1},{"dow":2,"bucket":1.5,"freq":3},{"dow":2,"bucket":2,"freq":1},{"dow":2,"bucket":2.5,"freq":3},{"dow":2,"bucket":3.5,"freq":1},{"dow":2,"bucket":4.5,"freq":1},{"dow":2,"bucket":5,"freq":1},{"dow":2,"bucket":8,"freq":1},{"dow":2,"bucket":9,"freq":1},{"dow":2,"bucket":9.5,"freq":1},{"dow":2,"bucket":10.5,"freq":4},{"dow":2,"bucket":11.5,"freq":1},{"dow":2,"bucket":12,"freq":1},{"dow":2,"bucket":14,"freq":4},{"dow":2,"bucket":15,"freq":1},{"dow":2,"bucket":15.5,"freq":5},{"dow":2,"bucket":16,"freq":1},{"dow":2,"bucket":16.5,"freq":1},{"dow":2,"bucket":17,"freq":1},{"dow":2,"bucket":19.5,"freq":1},{"dow":2,"bucket":20.5,"freq":1},{"dow":2,"bucket":21,"freq":4},{"dow":2,"bucket":22,"freq":2},{"dow":2,"bucket":22.5,"freq":2},{"dow":2,"bucket":23,"freq":1},{"dow":3,"bucket":0,"freq":1},{"dow":3,"bucket":1,"freq":1},{"dow":3,"bucket":2,"freq":3},{"dow":3,"bucket":3,"freq":1},{"dow":3,"bucket":3.5,"freq":1},{"dow":3,"bucket":6,"freq":1},{"dow":3,"bucket":8,"freq":1},{"dow":3,"bucket":9.5,"freq":1},{"dow":3,"bucket":10,"freq":1},{"dow":3,"bucket":10.5,"freq":3},{"dow":3,"bucket":12,"freq":1},{"dow":3,"bucket":12.5,"freq":1},{"dow":3,"bucket":13,"freq":1},{"dow":3,"bucket":13.5,"freq":1},{"dow":3,"bucket":14,"freq":1},{"dow":3,"bucket":14.5,"freq":4},{"dow":3,"bucket":15,"freq":1},{"dow":3,"bucket":15.5,"freq":1},{"dow":3,"bucket":16,"freq":4},{"dow":3,"bucket":16.5,"freq":1},{"dow":3,"bucket":17,"freq":2},{"dow":3,"bucket":17.5,"freq":1},{"dow":3,"bucket":18,"freq":1},{"dow":3,"bucket":18.5,"freq":1},{"dow":3,"bucket":19.5,"freq":1},{"dow":3,"bucket":20.5,"freq":1},{"dow":3,"bucket":22.5,"freq":1},{"dow":4,"bucket":1,"freq":2},{"dow":4,"bucket":2.5,"freq":1},{"dow":4,"bucket":3.5,"freq":1},{"dow":4,"bucket":5,"freq":1},{"dow":4,"bucket":5.5,"freq":1},{"dow":4,"bucket":8,"freq":1},{"dow":4,"bucket":8.5,"freq":2},{"dow":4,"bucket":9,"freq":1},{"dow":4,"bucket":10.5,"freq":1},{"dow":4,"bucket":11,"freq":2},{"dow":4,"bucket":11.5,"freq":1},{"dow":4,"bucket":12.5,"freq":2},{"dow":4,"bucket":13.5,"freq":1},{"dow":4,"bucket":15,"freq":3},{"dow":4,"bucket":15.5,"freq":1},{"dow":4,"bucket":16.5,"freq":2},{"dow":4,"bucket":17,"freq":2},{"dow":4,"bucket":17.5,"freq":4},{"dow":4,"bucket":18,"freq":3},{"dow":4,"bucket":19,"freq":4},{"dow":4,"bucket":19.5,"freq":1},{"dow":4,"bucket":20.5,"freq":1},{"dow":4,"bucket":21,"freq":1},{"dow":4,"bucket":21.5,"freq":1},{"dow":4,"bucket":24,"freq":1},{"dow":5,"bucket":0,"freq":1},{"dow":5,"bucket":1.5,"freq":2},{"dow":5,"bucket":3,"freq":2},{"dow":5,"bucket":4.5,"freq":1},{"dow":5,"bucket":5.5,"freq":2},{"dow":5,"bucket":6,"freq":1},{"dow":5,"bucket":8,"freq":1},{"dow":5,"bucket":11.5,"freq":1},{"dow":5,"bucket":12.5,"freq":1},{"dow":5,"bucket":13.5,"freq":2},{"dow":5,"bucket":14,"freq":4},{"dow":5,"bucket":15,"freq":2},{"dow":5,"bucket":15.5,"freq":4},{"dow":5,"bucket":16.5,"freq":2},{"dow":5,"bucket":17,"freq":3},{"dow":5,"bucket":18,"freq":1},{"dow":5,"bucket":18.5,"freq":1},{"dow":5,"bucket":19,"freq":1},{"dow":5,"bucket":19.5,"freq":1},{"dow":5,"bucket":20.5,"freq":1},{"dow":5,"bucket":21,"freq":1},{"dow":5,"bucket":21.5,"freq":1},{"dow":5,"bucket":22,"freq":1},{"dow":5,"bucket":22.5,"freq":1},{"dow":6,"bucket":0.5,"freq":1},{"dow":6,"bucket":4.5,"freq":2},{"dow":6,"bucket":6,"freq":3},{"dow":6,"bucket":7.5,"freq":1},{"dow":6,"bucket":8.5,"freq":1},{"dow":6,"bucket":9,"freq":1},{"dow":6,"bucket":10,"freq":3},{"dow":6,"bucket":10.5,"freq":1},{"dow":6,"bucket":13,"freq":1},{"dow":6,"bucket":13.5,"freq":1},{"dow":6,"bucket":16,"freq":3},{"dow":6,"bucket":16.5,"freq":2},{"dow":6,"bucket":17,"freq":5},{"dow":6,"bucket":17.5,"freq":1},{"dow":6,"bucket":18,"freq":1},{"dow":6,"bucket":19.5,"freq":1},{"dow":6,"bucket":20.5,"freq":1},{"dow":6,"bucket":21,"freq":1},{"dow":6,"bucket":21.5,"freq":1},{"dow":6,"bucket":22,"freq":1},{"dow":7,"bucket":0,"freq":3},{"dow":7,"bucket":2,"freq":2},{"dow":7,"bucket":2.5,"freq":2},{"dow":7,"bucket":3,"freq":1},{"dow":7,"bucket":3.5,"freq":2},{"dow":7,"bucket":5.5,"freq":1},{"dow":7,"bucket":7.5,"freq":1},{"dow":7,"bucket":8,"freq":2},{"dow":7,"bucket":8.5,"freq":1},{"dow":7,"bucket":9.5,"freq":5},{"dow":7,"bucket":10,"freq":1},{"dow":7,"bucket":11.5,"freq":2},{"dow":7,"bucket":12,"freq":1},{"dow":7,"bucket":12.5,"freq":2},{"dow":7,"bucket":14,"freq":3},{"dow":7,"bucket":14.5,"freq":1},{"dow":7,"bucket":15.5,"freq":2},{"dow":7,"bucket":16,"freq":2},{"dow":7,"bucket":16.5,"freq":8},{"dow":7,"bucket":17,"freq":2},{"dow":7,"bucket":17.5,"freq":4},{"dow":7,"bucket":19,"freq":1},{"dow":7,"bucket":19.5,"freq":3},{"dow":7,"bucket":22,"freq":1},{"dow":7,"bucket":22.5,"freq":1},{"dow":7,"bucket":23,"freq":2},{"dow":7,"bucket":23.5,"freq":1}]);
    });
});

// test route
app.get('/api/test', (req, res) => {
  res.send('Hello from Express!');
  console.log("Hello from Express!");
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
