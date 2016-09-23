const type = 'USER.UPDATE';

export default ({ email, name, photoUrl, uid }) => {
    return {
        type,
        payload: { email, name, photoUrl, uid }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.set('auth', { ...action.payload });
    }
};
