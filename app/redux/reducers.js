import { combineReducers } from 'redux';

import { reducer as menu } from './menu';
import { reducer as project } from './project';
import { reducer as search } from './search';
import { reducer as user } from './user';


const rootReducer = combineReducers({
    user,
    menu,
    project,
    search
});

export default rootReducer;
