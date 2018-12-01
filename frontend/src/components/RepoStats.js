import React, { Component } from 'react';
import '../App.css';
import Stream from '../charts/Stream';
import Radar from '../charts/Radar'
import axios from 'axios';

axios.defaults.port = 3001;

class RepoStats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            streamData: { commits: [], additions: [], deletions: [], net: [] },
            streamKeys: {},
            radarData: {},
            radarKeys: {},
            repoName: 'START STATE',
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
        this.handleTotal = this.handleTotal.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.repoName === this.state.value)
            return;

        if (this.state.value !== undefined || this.state.value !== '') {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:3001/api/getRepoContributions',
                params: {
                    repo: this.state.value
                }
            }).then((result) => {
                var streamData = { commits: [], additions: [], deletions: [], net: [] };
                var streamKeys = [];
                var radarData = [];
                var radarKeys = [];
                var index = 0;
                var keysIndex = 0;

                for (var week of result.data.data.weeks) {
                    var statIndex = 0;
                    for (var stat of week.stats) {
                        if (index === 0) {
                            streamKeys[keysIndex++] = stat.author;
                        }
                        if (statIndex++ === 0) {
                            streamData.commits[index] = {};
                            streamData.additions[index] = {};
                            streamData.deletions[index] = {};
                            streamData.net[index] = {};
                        }
                        streamData.commits[index][stat.author] = stat['commits'];
                        streamData.additions[index][stat.author] = stat['additions'];
                        streamData.deletions[index][stat.author] = stat['deletions'];
                        streamData.net[index][stat.author] = stat['net'];
                    }
                    index++;
                }

                let radarKeyIndex = 0;
                radarData[0] = { 'measure': 'Lines of Code Added' };
                for (let user of result.data.data.totalAdditions) {
                    radarData[0][user.name] = user.stat;
                    radarKeys[radarKeyIndex++] = user.name;
                }
                radarData[1] = { 'measure': 'Lines of Code Deleted' };
                for (let user of result.data.data.totalDeletions) {
                    radarData[1][user.name] = user.stat;
                }
                radarData[2] = { 'measure': 'Net Amount of Code' };
                for (let user of result.data.data.totalNet) {
                    radarData[2][user.name] = user.stat;
                }

                this.setState({ streamKeys, streamData, radarData, radarKeys, repoName: this.state.value, visible: true });
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

    handleTotal(event) {
        event.preventDefault();
        this.setState({ state: 'total', message: 'Total Stats' });
        this.handleSubmit(event);
    }

    render() {
        const { streamData, streamKeys, radarData, radarKeys, message } = this.state;
        let chart = null;

        if (this.state.visible) {
            if (this.state.state === 'total') {
                chart = <Radar data={radarData} keys={radarKeys} />
            }
            else {
                chart = <Stream message={message} data={streamData[this.state.state]} keys={streamKeys} />
            }
        }
        return (
            <div>
                <div className="App-header">
                    <div className="input-form" onSubmit={this.handleCommits}>
                        <form>
                            <input className="ghost-input" placeholder="Extended Repo Name" type="text" value={this.state.value} onChange={this.handleChange} />
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
                            <input className="ghost-input-small" type="submit" value="Net Code" />
                        </form>
                        <form className="row" onSubmit={this.handleTotal}>
                            <input className="ghost-input-small" type="submit" value="Overall Stats" />
                        </form>
                    </div>
                </div>
                <div className="App">
                    <div className="parent">
                        <div className="chart">
                            {chart}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RepoStats;
