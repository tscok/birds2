const type = 'SEARCH.SEARCHING';

export default ({ searching }) => {
    return {
        type,
        payload: { searching }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['search', 'searching'], action.payload.searching);
    }
};
