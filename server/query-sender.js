const {BigQuery}   = require('@google-cloud/bigquery');
const QueryBuilder = require('./query-builder.js');

const projectId = 'autopost-reddit';
const bigquery = new BigQuery({
  projectId: projectId,
});

function sanitizeInput(subreddit, numMonths, minscore, timezone) {
  subreddit = subreddit.toLowerCase();
  numMonths = parseInt(numMonths, 10);
  minscore = parseInt(minscore, 10);
  return [subreddit, numMonths, minscore, timezone];
}

function splitRows(rows) {
  results = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: []
  }
  for (let dow = 1; dow <= 7; dow++) {
    for (let i = 0; i < 48; i++) {
      results[dow].push(rows[(dow-1)*48 + i]['freq']);
    }
  }
  return results;
}

/**
 * Query Google BigQuery public Reddit post database and return array of
 * results. Relies on query-builder.js and SQL query templates in utils/sql.
 *
 * @param {String}  subreddit Subreddit to query.
 * @param {Int}     numMonths Number of months to include, starting from most
 *                            recent. Each month uses ~350 MB of data.
 * @param {Int}     minscore  Minimum score a post must have to be included.
 *
 * @returns {Array} Data to visualize. Each row contains post counts aggregated
 *                  at each half hour:
 *                  'dow':    Day of the week (1 = Sunday, 7 = Saturday).
 *                  'bucket': Submission time (24H) in local timezone, rounded
 *                            to the nearest half hour.
 *                  'freq':   Number of posts in the bucket with at least
 *                            `minscore` upvotes.
 */
async function queryBQ(subreddit, numMonths=2, minscore=100, timezone='-5') {
  const sqlQuery = QueryBuilder.buildQuery(...sanitizeInput(subreddit, numMonths, minscore, timezone));
  const options = {
    query: sqlQuery,
    location: 'US',
  };
  const [rows] = await bigquery.query(options);
  results = splitRows(rows);

  console.log('Query results:');
  rows.forEach(row => {
    const dow = row['dow'];
    const bucket = row['bucket'];
    const freq = row['freq'];
    console.log(`${dow}, ${bucket}: ${freq} posts`);
  });
  return results;
}

module.exports = {
  queryBQ: queryBQ,
  splitRows: splitRows
}
