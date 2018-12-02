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
      state: 'size',
      title: 'Size of Users Repos (kB)'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSize = this.handleSize.bind(this);
    this.handleStars = this.handleStars.bind(this);
    this.handleForks = this.handleForks.bind(this);
    this.handleWatchers = this.handleWatchers.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.data.name === this.state.value)
      return;

    if (this.state.value !== undefined || this.state.value !== '') {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:3001/api/getUserRepos',
        params: {
          username: this.state.value
        }
      }).then((result) => {
        result.data.data.size.language = "USERNAME";
        result.data.data.stars.language = "USERNAME";
        result.data.data.forks.language = "USERNAME";
        result.data.data.watchers.language = "USERNAME";
        this.setState({ data: result.data.data, visible: true });
      }).catch(function (error) {
        console.log(error);
      });
    }
  }

  handleSize(event) {
    event.preventDefault();
    this.setState({ state: 'size', message: 'Size of Users Repos (kB)' });
    this.handleSubmit(event);
  }

  handleWatchers(event) {
    event.preventDefault();
    this.setState({ state: 'watchers', message: 'Number of Watchers' });
    this.handleSubmit(event);
  }

  handleStars(event) {
    event.preventDefault();
    this.setState({ state: 'stars', message: 'Number of Stars' });
    this.handleSubmit(event);
  }

  handleForks(event) {
    event.preventDefault();
    this.setState({ state: 'forks', message: 'Number of Forks' });
    this.handleSubmit(event);
  }


  render() {
    const { data, message, state } = this.state;
    return (
      <div>
        <div className="App-header">
          <div className="input-form">
            <form onSubmit={this.handleSubmit}>
              <input className="ghost-input" placeholder="Username" type="text" value={this.state.value} onChange={this.handleChange} />
            </form>
          </div>
          <div className="rows">
            <form className="row" onSubmit={this.handleSize}>
              <input className="ghost-input-small" type="submit" value="Size" />
            </form>
            <form className="row" onSubmit={this.handleStars}>
              <input className="ghost-input-small" type="submit" value="Stars" />
            </form>
            <form className="row" onSubmit={this.handleWatchers}>
              <input className="ghost-input-small" type="submit" value="Watchers" />
            </form>
            <form className="row" onSubmit={this.handleForks}>
              <input className="ghost-input-small" type="submit" value="Forks" />
            </form>
          </div>
        </div>
        <div className="App">
          <div className="parent">
            <div className="chart">
              {this.state.visible ? <Bubble message={message} data={data[state]} /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserStats;
