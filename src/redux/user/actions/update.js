import initialState from 'src/redux/user/state';


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

        return state.set('auth', initialState({ email, name, photoUrl, provider, uid, wait: false }));
    }
};
