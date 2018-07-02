import { combineReducers } from 'redux';

import components from './components/reducers';
// import core from './core/reducers';
import user from './user/reducers';


const appReducer = combineReducers({
    components,
    // core,
    user
});

const rootReducer = (state, action) => {
    if (action.type === 'NAVIGATION.LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
