import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Home from './routes/Home';
import QueryForm from './routes/QueryForm';
import QueryResults from './routes/QueryResults';
import NoMatch from './routes/NoMatch';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const App = () => (
      <>
      <div id="site-header">
        <Link to="/" className="site-header-link">Autopost for Reddit</Link>
      </div>
      <div id="app">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/query' component={Home} />
          <Route component={NoMatch} />
          {/* <Route path='/query' component={QueryResults} /> */}
        </Switch>
      </div>
      </>
    );
    return (
      <Switch>
        <App />
      </Switch>
    );
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    // );
  }
}

export default App;
