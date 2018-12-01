import React, { Component } from 'react';
import '../App.css';
import Stream from '../charts/Stream';
import axios from 'axios';

axios.defaults.port = 3001;

class RepoContributions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            keys: {},
            state: 'commits',
            value: "",
            message: 'Number of Commits',
            visible: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCommits = this.handleCommits.bind(this);
        this.handleAdditions = this.handleAdditions.bind(this);
        this.handleDeletions = this.handleDeletions.bind(this);
        this.handleNet = this.handleNet.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.value !== undefined || this.state.value !== '') {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:3001/api/getRepoContributions',
                params: {
                    repo: this.state.value
                }
            }).then((result) => {
                var data = [];
                var keys = [];
                var index = 0;
                var keysIndex = 0;
                var info = this.state.state;
                for (var week of result.data.data.weeks) {
                    var statIndex = 0;
                    for (var stat of week.stats) {
                        if (index === 0) {
                            keys[keysIndex++] = stat.author;
                        }
                        if (statIndex++ === 0) {
                            data[index] = {};
                        }
                        data[index][stat.author] = stat[info];
                    }
                    index++;
                }

                this.setState({ data, keys, visible: true });
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    handleCommits(event) {
        event.preventDefault();
        this.setState({ state: 'commits', message: 'Number of Commits' });
        this.handleSubmit(event);
    }

    handleAdditions(event) {
        event.preventDefault();
        this.setState({ state: 'additions', message: 'Lines of Code Added' });
        this.handleSubmit(event);
    }

    handleDeletions(event) {
        event.preventDefault();
        this.setState({ state: 'deletions', message: 'Lines of Code Deleted' });
        this.handleSubmit(event);
    }

    handleNet(event) {
        event.preventDefault();
        this.setState({ state: 'net', message: 'Net Lines of Code' });
        this.handleSubmit(event);
    }


    render() {
        const { data, keys, message } = this.state;
        return (
            <div>
                <div className="App-header">
                    <div className="input-form">
                        <form>
                            <input className="ghost-input" placeholder="Repo Name" type="text" value={this.state.value} onChange={this.handleChange} />
                        </form>
                    </div>
                    <div className="rows">
                        <form className="row" onSubmit={this.handleCommits}>
                            <input className="ghost-input-small" type="submit" value="Commits" />
                        </form>
                        <form className="row" onSubmit={this.handleAdditions}>
                            <input className="ghost-input-small" type="submit" value="Additions" />
                        </form>
                        <form className="row" onSubmit={this.handleDeletions}>
                            <input className="ghost-input-small" type="submit" value="Deletions" />
                        </form>
                        <form className="row" onSubmit={this.handleNet}>
                            <input className="ghost-input-small" type="submit" value="Net" />
                        </form>
                    </div>
                </div>
                <div className="App">
                    <div className="parent">
                        <div className="chart">
                            {this.state.visible ? <Stream message={message} data={data} keys={keys} /> : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RepoContributions;
