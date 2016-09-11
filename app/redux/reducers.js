import { combineReducers } from 'redux';

import components from './components/reducers';

import { reducer as menu } from './menu';
import { reducer as user } from './user';


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
