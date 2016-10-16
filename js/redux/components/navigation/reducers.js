import { reducer as initialize } from './actions/initialize';
import { reducer as reset } from './actions/reset';
import { reducer as toggle } from './actions/toggle';

export default {
    ...initialize,
    ...reset,
    ...toggle
};
