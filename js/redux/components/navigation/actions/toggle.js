const type = 'NAVIGATION.TOGGLE';

export default ({ expanded }) => {
    return {
        type,
        payload: { expanded }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['navigation', 'expanded'], action.payload.expanded);
    }
};
