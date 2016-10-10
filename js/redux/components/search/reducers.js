import { reducer as initialize } from './actions/initialize';
import { reducer as loading } from './actions/loading';
import { reducer as update } from './actions/update';

export default {
    ...initialize,
    ...loading,
    ...update
};
