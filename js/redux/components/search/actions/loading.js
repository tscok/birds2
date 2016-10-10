const type = 'SEARCH.LOADING';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['search', 'loading'], true);
    }
};
