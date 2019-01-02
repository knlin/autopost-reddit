import React, { Component } from 'react';

import Heatmap from './Heatmap';

import '../App.css';

class QueryResults extends Component {
  constructor(props) {
    super(props);
    console.log('QueryResults props:');
    console.log(this.props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log('QueryResults mounted:');
    console.log(this.props);
  }

  componentWillUnmount() {
    console.log('QueryResults will unmount.');
  }

  handleChange(event) {
    this.props.onChange(event);
  }

  render() {
    return (
      <>
        { this.props.visdata !== undefined && Object.keys(this.props.visdata).length > 0 && <Heatmap data={this.props.visdata} /> }
      </>
    );
  }
}

export default QueryResults;
