import { combineReducers } from 'redux';

import { reducer as menu } from './menu';
import { reducer as profile } from './profile';
import { reducer as project } from './project';
import { reducer as search } from './search';
import { reducer as user } from './user';


const rootReducer = combineReducers({
    menu,
    profile,
    project,
    search,
    user
});

export default rootReducer;
