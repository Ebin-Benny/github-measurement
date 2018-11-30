import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UserRepoSize from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<UserRepoSize />, document.getElementById('root'));

serviceWorker.unregister();
