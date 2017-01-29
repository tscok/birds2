import projects from 'js/redux/components/projects/state/projects';


const type = 'PROJECTS.RESET';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['projects'], projects());
    }
};
