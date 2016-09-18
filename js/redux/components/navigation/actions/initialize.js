import navigation from 'js/redux/components/navigation/state/navigation';


const type = 'NAVIGATION.INITIALIZE';

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
