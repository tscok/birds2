import { reducer as initialize } from './actions/initialize';
import { reducer as pending } from './actions/pending';
import { reducer as reset } from './actions/reset';
import { reducer as update } from './actions/update';

export default {
    ...initialize,
    ...pending,
    ...reset,
    ...update
};
