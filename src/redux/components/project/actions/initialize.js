import initialState from 'src/redux/components/project/state';


const type = 'PROJECT.INITIALIZE';

export default (root, props) => {
    return {
        type,
        payload: { id: props.params.id }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['project'], initialState(action.payload));
    }
};
