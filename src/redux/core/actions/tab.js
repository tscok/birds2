import { getPath } from 'src/redux/utils';
import Immutable from 'seamless-immutable';


const type = 'TAB.CHANGE';

export default ({ name, path, root, active }) => {
    return {
        type,
        meta: { name, path, root },
        payload: { active }
    };
};

export const reducer = {
    [type]: (state, action) => {

        const setSelected = (tabs) => {
            const mutable = tabs.asMutable({ deep: true });
            Object.keys(mutable).map((tab) => mutable[tab].active = tab === action.meta.name);
            return Immutable(mutable);
        };

        return state.updateIn(getPath(action.meta), setSelected);
    }
};

export const tab = ({ active = false } = {}) => {
    return {
        active
    };
};
