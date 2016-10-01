const type = 'PROJECTS.UPDATE';

export default ({ root, list }) => {
    return {
        type,
        meta: { root },
        payload: { list }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['projects'], { list: action.payload.list, loading: false });
    }
};
