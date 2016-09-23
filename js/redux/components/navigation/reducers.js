import { reducer as initialize } from './actions/initialize';
import { reducer as toggle } from './actions/toggle';

export default {
    ...initialize,
    ...toggle
};
