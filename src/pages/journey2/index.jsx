import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppRedux from '@store/reducers';
import App from './App';
import '@utils/common';
import '@css/reset.less';

let store = createStore(AppRedux);
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));