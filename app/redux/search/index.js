/**
 * Default state
 */
const defaultState = {
    isSearching: false,
    keyword: '',
    results: []
};


/**
 * Action types
 */
const SEARCH_UPDATE = 'SEARCH_UPDATE';
const SEARCH_RESET = 'SEARCH_RESET';


/**
 * Action creators
 */
export const searchUpdate = (payload) => {
    return {
        type: SEARCH_UPDATE,
        payload
    };
};

export const searchReset = () => {
    return {
        type: SEARCH_RESET
    };
};


/**
 * Reducer
 */
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case SEARCH_UPDATE:
            return {
                ...state,
                ...action.payload
            };

        case SEARCH_RESET:
            state = defaultState;
            return { ...state };

        default:
            return { ...state };
    };
};
