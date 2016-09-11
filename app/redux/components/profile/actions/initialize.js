import profile from 'app/redux/components/profile/state/profile';


const type = 'PROFILE.INITIALIZE';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['profile'], profile());
    }
};
