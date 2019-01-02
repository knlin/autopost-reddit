import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import QueryForm from './QueryForm';
import QueryResults from './QueryResults';
import Heatmap from './Heatmap';

class Home extends Component {
  constructor(props) {
    super(props);
    const query = queryString.parse(this.props.location.search);
    this.state = {
      'subreddit': query.subreddit || '',
      'months': query.months || 2,
      'score': query.score || 100,
      'visdata': (this.props.location.state && this.props.location.state.visdata) || []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('Home mounted:');
    console.log(this.state);
  }

  componentWillUnmount() {
    console.log('Home will unmount.');
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Home handling submit:');
    console.log(this.state);
    const score = parseInt(this.state.score, 10);
    if (score < 1 || score > 9999) {
      alert('Minimum score must be between 1 and 9999. Please try again.');
      return;
    }
    this.getQueryResults();
    console.log('Home state after submit:');
    console.log(this.state);
  }

  // Call backend API to send query to BigQuery, save response array in
  // 'visdata' state variable, and change the URL to reflect the new query.
  getQueryResults = () => {
    const queryObj = (({ subreddit, months, score }) => ({ subreddit, months, score }))(this.state);
    const query = queryString.stringify(queryObj);
    fetch('/api/query?' + query)
    .then(res => res.json())
    .then(response => {
      // set URL to '/query?...' and save BigQuery query response in visdata for QueryResults to visualize
      this.props.history.push({
        pathname: '/query',
        search: query,
        state: { 'visdata': response }
      });
      console.log(JSON.stringify(response));
      console.log('URL changed.');
    });
  }

  render() {
    return (
      <>
        <QueryForm
          subreddit={this.state.subreddit}
          score={this.state.score}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit} />
        <QueryResults
          subreddit={this.state.subreddit}
          months={this.state.months}
          score={this.state.score}
          visdata={this.state.visdata}
          onChange={this.handleChange} />
      </>
    );
  }
}

export default Home;
