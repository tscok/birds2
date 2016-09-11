import { getPath } from 'app/redux/components/utils';


const type = 'TEXTBOX.CHANGE';

export default ({ root, path, value }) => {
    return {
        type,
        meta: { root, path },
        payload: { value }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(getPath(action.meta), textbox.update(action.payload.value));
    }
};

export const textbox = ({ value = '' } = {}) => {
    return {
        value
    };
};

textbox.update = (value) => {
    return textbox({ value });
};
