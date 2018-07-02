const type = 'SEARCH.UPDATE';

export default ({ result }) => {
    return {
        type,
        payload: { result }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state
            .setIn(['search', 'result'], action.payload.result)
            .setIn(['search', 'searching'], false);
    }
};
