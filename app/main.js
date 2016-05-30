import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import routes from './routes';

import '../less/index';


render(
    <Provider store={ store }>
        { routes }
    </Provider>,
    document.getElementById('app')
);
