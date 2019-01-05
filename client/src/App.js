import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './routes/Home';
import QueryForm from './routes/QueryForm';
import QueryResults from './routes/QueryResults';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const App = () => (
      <>
      <div id="site-header">
        <h1>Autopost for Reddit</h1>
      </div>
      <div id="app">
        <Switch>
          <Route path='/' component={Home} />
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
