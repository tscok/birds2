import { combineReducers } from 'redux';

import components from './components/reducers';
import user from './user/reducers';

const appReducer = combineReducers({
    components,
    user
});

const rootReducer = (state, action) => {
    if (action.type === 'NAVIGATION.LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
