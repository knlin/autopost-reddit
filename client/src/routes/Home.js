import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <h1>Autopost for Reddit</h1>
        <Link to={'./query'}>
          <form>
            <label>
              Subreddit:
              <input type="text" name="subreddit" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </Link>
      </div>
    );
  }
}

export default Home;