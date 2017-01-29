import handle from 'redux-seamless-reducers';

import core from './core/reducers';
import login from './login/reducers';
import navigation from './navigation/reducers';
import project from './project/reducers';
import projects from './projects/reducers';
import search from './search/reducers';


export default handle({
    ...core,
    ...login,
    ...navigation,
    ...project,
    ...projects,
    ...search
}, {});
