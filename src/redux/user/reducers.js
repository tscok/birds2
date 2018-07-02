import { handleActions } from 'redux-seamless-reducers';

import { reducer as initialize } from './actions/initialize';
import { reducer as update } from './actions/update';

export default handleActions({
    ...initialize,
    ...update
}, {})
