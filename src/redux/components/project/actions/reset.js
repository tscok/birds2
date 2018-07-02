import initialState from 'src/redux/components/project/state';


const type = 'PROJECT.RESET';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state) => {
        return state.setIn(['project'], initialState());
    }
};
