import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers';
import App from './App';
import {Map} from 'immutable';

export default {
    init: userData => {
        const User = Map({
            username: userData.username
        });
        const store = createStore(
            reducers,
            {User}
        );

        render(
            <Provider store={store}>
                <App/>
            </Provider>,
            document.getElementById('root')
        );
    }
};
