import { getPath } from 'src/redux/utils';


const type = 'NAVIGATION.EXPAND';

export default ({ path, root }) => {
    return {
        type,
        meta: { path, root }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn([ ...getPath(action.meta), 'expanded'], true)
    }
};
