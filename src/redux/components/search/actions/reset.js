import initialState from 'src/redux/components/search/state';


const type = 'SEARCH.RESET';

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
