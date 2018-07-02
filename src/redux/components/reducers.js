import { handleActions } from 'redux-seamless-reducers';

import core from 'src/redux/core/reducers';

import create from './create/reducers';
import login from './login/reducers';
import navigation from './navigation/reducers';
import project from './project/reducers';
import projects from './projects/reducers';
import search from './search/reducers';


export default handleActions({
    ...core,
    ...create,
    ...login,
    ...navigation,
    ...project,
    ...projects,
    ...search
}, {});
