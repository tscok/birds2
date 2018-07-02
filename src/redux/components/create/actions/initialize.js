import initialState from 'src/redux/components/create/state';


const type = 'CREATE.INITIALIZE';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state) => {
        return state.setIn(['create'], initialState());
    }
};
