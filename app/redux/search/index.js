/**
 * Default state
 */
const searchState = {
    data: {},
    isSearching: false,
    keyword: '',
    results: []
};


/**
 * Action types
 */
const SEARCH_UPDATE = 'SEARCH_UPDATE';


/**
 * Action creators
 */
export const searchUpdate = (payload) => {
    return {
        type: SEARCH_UPDATE,
        payload
    };
};


/**
 * Reducer
 */
export const reducer = (state = searchState, action) => {
    switch (action.type) {
        case SEARCH_UPDATE:
            return {
                ...state,
                ...action.payload
            };

        default:
            return { ...state };
    };
};
