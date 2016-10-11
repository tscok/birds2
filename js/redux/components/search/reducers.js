import { reducer as initialize } from './actions/initialize';
import { reducer as reset } from './actions/reset';
import { reducer as search } from './actions/search';
import { reducer as update } from './actions/update';

export default {
    ...initialize,
    ...reset,
    ...search,
    ...update
};
