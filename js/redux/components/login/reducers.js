import { reducer as initialize } from './actions/initialize';
import { reducer as reset } from './actions/reset';
import { reducer as submit } from './actions/submit';

export default {
    ...initialize,
    ...reset,
    ...submit
};
