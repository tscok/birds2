import { combineReducers } from 'redux';

import Immutable from 'seamless-immutable';

import components from './components/reducers';

import { reducer as menu } from './menu';
// import { reducer as user } from './user';

import user from './user/reducers';

const appReducer = combineReducers({
    components,
    menu,
    user
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
