import React, { Component } from 'react';
import queryString from 'query-string';

import '../App.css';

class QueryForm extends Component {
  constructor(props) {
    super(props);
    const query = queryString.parse(this.props.location.search);
    this.state = {
      'subreddit': query.subreddit || '',
      'months': query.months || 2,
      'score': query.score || 100,
      'visdata': []
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getQueryResults = this.getQueryResults.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    let score = parseInt(this.state.score, 10);
    if (score < 1 || score > 9999) {
      alert('Minimum score must be between 1 and 9999. Please try again.');
      return;
    }
    // alert('Form submitted: ' + JSON.stringify(this.state));
    this.getQueryResults();
  }

  componentDidMount() {
    console.log('State after mounting:');
    console.log(this.state);
  }

  getQueryResults = () => {
    let queryObj = (({ subreddit, months, score }) => ({ subreddit, months, score }))(this.state);
    let query = queryString.stringify(queryObj);
    fetch('/api/query?' + query)
    .then(res => res.json())
    .then(response => {
      // set URL to /query?...
      this.props.history.push({
        pathname: '/query',
        search: '?' + query
      });
      console.log(JSON.stringify(response));
      // save BigQuery query results in variable for visualization
      this.setState({ visdata: response });
    })
    .then(() => console.log(this.state));
  };

  render() {
    return (
      <form className="queryForm" onSubmit={this.handleSubmit}>
        <label>Subreddit:</label>
        <input type="text" name="subreddit" value={this.state.subreddit} onChange={this.handleChange} required pattern="[A-Za-z0-9_]{3,21}" maxlength="21" />
        <label>Minimum score:</label>
        <input type="number" name="score" value={this.state.score} onChange={this.handleChange} required />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default QueryForm;