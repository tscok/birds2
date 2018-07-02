import { getPath } from 'src/redux/utils';


const type = 'CREATE.UPDATE';

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
