const type = 'USER.UPDATE';

export default ({ email, name, photoUrl, provider, uid }) => {
    return {
        type,
        payload: { email, name, photoUrl, provider, uid }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.set('auth', { ...action.payload });
    }
};
