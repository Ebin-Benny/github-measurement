import React, { Component } from 'react';
import './App.css';
import Bubble from './charts/Bubble';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <header>
            Github
        </header>
        </div>
        <div className="App">
          <div className="parent">
            <div className="chart">
              <Bubble />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
