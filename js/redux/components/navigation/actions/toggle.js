import { getPath } from 'js/redux/components/utils';

const type = 'NAVIGATION.TOGGLE';

export default ({ root, path, expanded }) => {
    return {
        type,
        meta: { root, path },
        payload: { expanded }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(getPath(action.meta), action.payload.expanded);
    }
};
