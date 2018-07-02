import { reducer as radio } from './actions/radio';
import { reducer as tab } from './actions/tab';
import { reducer as textbox } from './actions/textbox';
import { reducer as toggle } from './actions/toggle';

export default {
    ...radio,
    ...tab,
    ...textbox,
    ...toggle
};
