import project from 'js/redux/components/project/state/project';


const type = 'PROJECT.RESET';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state) => {
        return state.setIn(['project'], project());
    }
};
