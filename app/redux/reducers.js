import { combineReducers } from 'redux';

import { reducer as create } from './create';
import { reducer as login } from './login';
import { reducer as menu } from './menu';
import { reducer as profile } from './profile';
import { reducer as project } from './project';
import { reducer as search } from './search';
import { reducer as user } from './user';


const appReducer = combineReducers({
    create,
    login,
    menu,
    profile,
    project,
    search,
    user
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
