import login from 'js/redux/components/login/state/login';


const type = 'LOGIN.INITIALIZE';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['login'], login());
    }
};
