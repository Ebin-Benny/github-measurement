import React, { Component } from 'react';
import './App.css';
import UserRepoSize from './components/UserRepoSize';
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
                        <Route path="/UserRepoSize" component={UserRepoSize} />
                    </div>
                    <ul className="App-footer">
                        <li><NavLink to="/UserRepoSize">Repo Size</NavLink></li>
                    </ul>
                </div>
            </HashRouter>
        );
    }
}

export default App;