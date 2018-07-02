const type = 'PROJECTS.PENDING-COUNT';

export default ({ id, count }) => {
    return {
        type,
        meta: { id },
        payload: { count }
    };
};

export const reducer = {
    [type]: (state, action) => {
        const { count } = action.payload;
        return state.setIn(['projects', 'pending', `${action.meta.id}`], { count });
    }
};
