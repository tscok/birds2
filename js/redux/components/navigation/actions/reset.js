import navigation from 'js/redux/components/navigation/state/navigation';


const type = 'NAVIGATION.RESET';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['navigation'], navigation());
    }
};
