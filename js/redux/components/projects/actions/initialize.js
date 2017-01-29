import projects from 'js/redux/components/projects/state/projects';


const type = 'PROJECTS.INITIALIZE';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state) => {
        return state.setIn(['projects'], projects());
    }
};
