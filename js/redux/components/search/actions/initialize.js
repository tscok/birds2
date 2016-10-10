import search from 'js/redux/components/search/state/search';


const type = 'SEARCH.INITIALIZE';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state) => {
        return state.setIn(['search'], search());
    }
};
