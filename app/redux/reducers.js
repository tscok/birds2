import { combineReducers } from 'redux';

import { reducer as create } from './create';
import { reducer as join } from './join';
import { reducer as login } from './login';
import { reducer as members } from './members';
import { reducer as menu } from './menu';
import { reducer as pending } from './pending';
import { reducer as profile } from './profile';
import { reducer as project } from './project';
import { reducer as rings } from './rings';
import { reducer as search } from './search';
import { reducer as user } from './user';


const appReducer = combineReducers({
    create,
    join,
    login,
    members,
    menu,
    pending,
    profile,
    project,
    rings,
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
