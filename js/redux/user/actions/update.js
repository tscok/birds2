import user from 'js/redux/user/state/user';


const type = 'USER.UPDATE';

export default ({ email, name, photoUrl, provider, uid }) => {
    return {
        type,
        payload: { email, name, photoUrl, provider, uid }
    };
};

export const reducer = {
    [type]: (state, action) => {
        const { email, name, photoUrl, provider, uid } = action.payload;

        return state.set('auth', user({ email, name, photoUrl, provider, uid, wait: false }));
    }
};
