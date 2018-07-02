const type = 'SEARCH.BUTTON';

export default ({ id, loading, status }) => {
    return {
        type,
        meta: { id },
        payload: { loading, status }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['search', 'button', `${action.meta.id}`], action.payload);
    }
};
