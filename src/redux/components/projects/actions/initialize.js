import initialState from 'src/redux/components/projects/state';


const type = 'PROJECTS.INITIALIZE';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state) => {
        return state.setIn(['projects'], initialState());
    }
};
