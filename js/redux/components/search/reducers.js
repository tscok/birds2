import { reducer as button } from './actions/button';
import { reducer as initialize } from './actions/initialize';
import { reducer as reset } from './actions/reset';
import { reducer as search } from './actions/search';
import { reducer as update } from './actions/update';

export default {
    ...button,
    ...initialize,
    ...reset,
    ...search,
    ...update
};
