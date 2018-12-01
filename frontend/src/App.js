import React, { Component } from 'react';
import './App.css';
import UserStats from './components/UserStats';
import RepoStats from './components/RepoStats';

import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

class App extends Component {

    render() {
        return (
            <HashRouter>
                <div>
                    <div>
                        <Route path="/User" component={UserStats} />
                        <Route path="/Repo" component={RepoStats} />
                    </div>
                    <ul className="App-footer">
                        <li><NavLink to="/User">User Information</NavLink></li>
                        <li><NavLink to="/Repo">Repo Information</NavLink></li>
                    </ul>
                </div>
            </HashRouter>
        );
    }
}

export default App;