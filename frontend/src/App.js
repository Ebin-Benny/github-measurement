import React, { Component } from 'react';
import './App.css';
import Bubble from './charts/Bubble';
import Form from './input/Form';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
      },
      value: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      data: {
        "name": "nivo",
        "children": [
          {
            "name": "xAxis",
            "loc": 118342,
            "language": "Java"
          },
          {
            "loc": 80095,
            "name": "yAxis",
            "language": "Typescript"
          },
        ],
      }
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <div className="App-header">
          <header>
            Github
        </header>
          <div className="input-form">
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </form>
          </div>
        </div>
        <div className="App">
          <div className="parent">
            <div className="chart">
              <Bubble data={data} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
