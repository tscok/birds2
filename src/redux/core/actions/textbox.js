import { getPath } from 'src/redux/utils';


const type = 'TEXTBOX.CHANGE';

export default ({ root, path, error, valid, value }) => {
    return {
        type,
        meta: { root, path },
        payload: { error, valid, value }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(getPath(action.meta), textbox.update(action.payload));
    }
};

export const textbox = ({ error = false, valid = false, value = '' } = {}) => {
    return {
        error,
        valid,
        value
    };
};

textbox.update = (payload) => {
    return textbox(payload);
};
