import { reducer as textbox } from './actions/textbox';
import { reducer as toggle } from './actions/toggle';

export default {
    ...textbox,
    ...toggle
};
