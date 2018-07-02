import initialState from 'src/redux/user/state';


const type = 'USER.INITIALIZE';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state) => {
        return state.set('auth', initialState());
    }
};
