import React, { Component } from 'react';
import * as d3 from 'd3';

import '../App.css';

class Heatmap extends Component {
  constructor(props) {
    super(props);
    console.log('Heatmap props:');
    console.log(this.props.data[1]);
  }

  componentDidMount() {
    console.log('Heatmap mounted:');
    this.drawHeatmap();
  }

  componentWillUnmount() {
    console.log('Heatmap will unmount.');
  }

  drawHeatmap() {
    console.log(this.props.data[1]);
  }

  render() {
    return (
      <div className="heatmap">
        <h2>Heatmap</h2>
        <table>
          <tr><th scope="row">Sunday</th>   {this.props.data[1].map(freq => <td>{freq}</td>)}</tr>
          <tr><th scope="row">Monday</th>   {this.props.data[2].map(freq => <td>{freq}</td>)}</tr>
          <tr><th scope="row">Tuesday</th>  {this.props.data[3].map(freq => <td>{freq}</td>)}</tr>
          <tr><th scope="row">Wednesday</th>{this.props.data[4].map(freq => <td>{freq}</td>)}</tr>
          <tr><th scope="row">Thursday</th> {this.props.data[5].map(freq => <td>{freq}</td>)}</tr>
          <tr><th scope="row">Friday</th>   {this.props.data[6].map(freq => <td>{freq}</td>)}</tr>
          <tr><th scope="row">Saturday</th> {this.props.data[7].map(freq => <td>{freq}</td>)}</tr>
        </table>
      </div>
    );
  }
}

export default Heatmap;
