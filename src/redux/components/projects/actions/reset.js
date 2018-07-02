import initialState from 'src/redux/components/projects/state';


const type = 'PROJECTS.RESET';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['projects'], initialState());
    }
};
