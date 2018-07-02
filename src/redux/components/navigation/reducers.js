import { reducer as collapse } from './actions/collapse';
import { reducer as expand } from './actions/expand';
import { reducer as initialize } from './actions/initialize';
import { reducer as reset } from './actions/reset';

export default {
    ...collapse,
    ...expand,
    ...initialize,
    ...reset
};
