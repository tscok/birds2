import { getPath } from 'js/redux/components/utils';


const type = 'TOGGLE.CHANGE';

export default ({ root, path, value }) => {
    return {
        type,
        meta: { root, path },
        payload: { value }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(getPath(action.meta), action.payload.value);
    }
};