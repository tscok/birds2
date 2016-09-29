import handle from 'redux-seamless-reducers';

import core from './core/reducers';
import login from './login/reducers';
import navigation from './navigation/reducers';
import projects from './projects/reducers';


export default handle({
    ...core,
    ...login,
    ...navigation,
    ...projects
}, {});
