import project from 'js/redux/components/project/state/project';


const type = 'PROJECT.INITIALIZE';

export default (root, props) => {
    return {
        type,
        payload: { id: props.params.id }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['project'], project(action.payload));
    }
};
