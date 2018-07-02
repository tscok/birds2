const type = 'PROJECTS.UPDATE';

export default ({ list }) => {
    return {
        type,
        payload: { list }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state
            .setIn(['projects', 'list'], action.payload.list)
            .setIn(['projects', 'loading'], false);
    }
};
