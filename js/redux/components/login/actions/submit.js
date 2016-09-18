import { getPath } from 'js/redux/components/utils';


const type = 'LOGIN.SUBMIT';

export default ({ root, path, submitting }) => {
    return {
        type,
        meta: { root, path },
        payload: { submitting }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(getPath(action.meta), action.payload.submitting);
    }
};
