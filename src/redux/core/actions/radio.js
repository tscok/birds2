import { getPath } from 'src/redux/utils';
import Immutable from 'seamless-immutable';


const type = 'RADIO.CHANGE';

export default ({ label, path, root }) => {
    return {
        type,
        meta: { path, root },
        payload: { label }
    };
};

export const reducer = {
    [type]: (state, action) => {

        const setSelected = (group) => {
            const mutable = group.asMutable({ deep: true });
            mutable.options.map((option) => option.active = option.label === action.payload.label);
            mutable.value = action.payload.label;
            return Immutable(mutable);
        }

        return state.updateIn(getPath(action.meta), setSelected);
    }
};

export const option = ({ label = '', active = false } = {}) => {
    return {
        label,
        active
    };
};
