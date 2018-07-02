const type = 'PROJECT.TERMINATE';

export default ({ root }) => {
    return {
        type,
        meta: { root }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.without(action.meta.root);
    }
};
