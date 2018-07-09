import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import './assets/styles/index.less';

import reducers from './reducers';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import App from './App';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Home from './components/Home/Home.jsx';


const store = createStore(reducers);
const PageNotFound = () => <h1>Page not found</h1>;
render(
    <Provider store={store}>
        <Router>
            <App>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <PublicRoute path="/register" component={Register}/>
                    <PublicRoute path="/login" component={Login}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </App>
        </Router>
    </Provider>,
    document.getElementById('root')
);

//initInfo({}).then(Router.init).catch((err) => {
//    console.log(err);
//    // throw 'Error';
//});