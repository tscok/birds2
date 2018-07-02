const type = 'PROJECT.SET';

export default ({ project }) => {
    return {
        type,
        payload: { project }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['project'], action.payload.project);
    }
};
