import React, { Component } from 'react';
import '../App.css';
import Bubble from '../charts/Bubble';
import axios from 'axios';

axios.defaults.port = 3001;

class UserStats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      value: "",
      visible: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value !== undefined || this.state.value !== '') {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:3001/api/getUserRepos',
        params: {
          username: this.state.value
        }
      }).then((result) => {
        result.data.data.language = "USERNAME"
        this.setState({ data: result.data.data, visible: true });
      }).catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <div className="App-header">
          <div className="input-form">
            <form onSubmit={this.handleSubmit}>
              <input className="ghost-input" placeholder="Username" type="text" value={this.state.value} onChange={this.handleChange} />
            </form>
          </div>
        </div>
        <div className="App">
          <div className="parent">
            <div className="chart">
              {this.state.visible ? <Bubble message={'Size of Users Repos (kB)'} data={data} /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserStats;
