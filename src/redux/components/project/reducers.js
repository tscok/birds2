import { reducer as initialize } from './actions/initialize';
import { reducer as reset } from './actions/reset';
import { reducer as set } from './actions/set';
import { reducer as terminate } from './actions/terminate';

export default {
    ...initialize,
    ...reset,
    ...set,
    ...terminate
};
