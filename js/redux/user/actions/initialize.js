import user from 'js/redux/user/state/user';


const type = 'USER.INITIALIZE';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state) => {
        return state.set('auth', user());
    }
};
