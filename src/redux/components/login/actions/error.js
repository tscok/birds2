const type = 'LOGIN.ERROR';

export default ({ message }) => {
    return {
        type,
        payload: { message }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['login', 'error', 'message'], action.payload.message);
    }
};
