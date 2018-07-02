import initialState from 'src/redux/components/search/state';


const type = 'SEARCH.INITIALIZE';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state) => {
        return state.setIn(['search'], initialState());
    }
};
