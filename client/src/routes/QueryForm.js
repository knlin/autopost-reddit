import React, { Component } from 'react';

import '../App.css';

class QueryForm extends Component {
  constructor(props) {
    super(props);
    console.log('QueryForm props:');
    console.log(this.props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('QueryForm mounted:');
    console.log(this.props);
  }

  componentWillUnmount() {
    console.log('QueryForm will unmount.');
  }
  handleChange(event) {
    this.props.onChange(event);
  }

  handleSubmit(event) {
    this.props.onSubmit(event);
  }

  render() {
    return (
      <>
        <form className="queryForm" onSubmit={this.handleSubmit}>
          <label>Subreddit:</label>
          <input type="text" name="subreddit" value={this.props.subreddit} onChange={this.handleChange} required pattern="[A-Za-z0-9_]{3,21}" maxlength="21" />
          <label>Minimum score:</label>
          <input type="number" name="score" value={this.props.score} onChange={this.handleChange} required />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default QueryForm;
