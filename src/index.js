import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css'; 
import App from './App';
import LoginPage from './component/login/LoginPage';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {createStore} from "redux";
import reduer from './reducers'
import { Provider } from "react-redux";

const store = createStore(reduer);

ReactDOM.render(
    <Router>
        <Provider store = {store}>
            <Switch>
                <Route path="/login" exact component={LoginPage}></Route>
                <Route path="/" component={App}></Route>
            </Switch>
        </Provider>
    </Router>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
