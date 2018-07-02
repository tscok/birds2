import initialState from 'src/redux/components/navigation/state';


const type = 'NAVIGATION.INITIALIZE';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state) => {
        return state.setIn(['navigation'], initialState());
    }
};
