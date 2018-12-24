const fs   = require('fs');
const path = require('path');

const YYYY = 2018;
const MM = 10;
const QUERYFILE = './sql/query.txt';
const SUBQUERYFILE = './sql/subquery.txt';

function strPad(n) {
  return String("00" + n).slice(-2);
}

function timezone() {
  var timezone = new Date().getTimezoneOffset() / 60;
  timezone = timezone >= 0 ? '+' + timezone : '' + timezone;
  return timezone;
}

// Return array of yyyy_mm strings.
function getMonths(year, month, numMonths) {
  var months = [''+year+'_'+strPad(month)];
  for (let i = 0; i < numMonths; i++) {
    if (month === 1) {
      year -= 1;
      month = 12;
    } else {
      month -= 1;
    }
    months.push(''+year+'_'+strPad(month));
  }
  return months;
}

function readSQL(filepath) {
  try {
    var query = fs.readFileSync(path.resolve(__dirname, filepath), 'utf8');
  } catch(e) {
    console.log('Error:', e.stack);
  }
  return query;
}

// Return full query string from UNION ALL of monthly subqueries.
function buildQuery(subreddit, numMonths, minscore) {
  query = readSQL(QUERYFILE);
  subquery = readSQL(SUBQUERYFILE);
  subreddit = subreddit.toLowerCase();
  minscore = Math.floor(minscore);

  function _buildQuery(query, subquery, timezone) {
    var months = getMonths(YYYY, MM, numMonths);
    var temp = subquery.replace('{yyyy_mm}', months[0])
                       .replace('{timezone}', timezone)
                       .replace('{subreddit}', subreddit)
                       .replace('{scoreThreshold}', minscore);
    for (let i = 1; i < numMonths; i++) {
      temp += '\n      UNION ALL\n'
            + subquery.replace('{yyyy_mm}', months[i])
                      .replace('{timezone}', timezone)
                      .replace('{subreddit}', subreddit)
                      .replace('{scoreThreshold}', minscore);
    }
    console.log(query.replace('{subquery}', temp));
    return query.replace('{subquery}', temp);
  }
  return _buildQuery(query, subquery, timezone());
}

module.exports = {
  buildQuery: buildQuery
};