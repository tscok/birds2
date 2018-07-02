import initialState from 'src/redux/components/login/state';


const type = 'LOGIN.RESET';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['login'], initialState());
    }
};
