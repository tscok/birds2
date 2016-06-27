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
const RESULT_UPDATE = 'RESULT_UPDATE';


/**
 * Action creators
 */
export const searchUpdate = (payload) => {
    return {
        type: SEARCH_UPDATE,
        payload
    };
};

export const resultUpdate = (index, role) => {
    return {
        type: RESULT_UPDATE,
        index,
        role
    }
}


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

        case RESULT_UPDATE:
            return {
                ...state,
                results: state.results.map((result, index) => {
                    if (index === action.index) {
                        return {
                            ...result,
                            role: action.role
                        };
                    }
                    return result;
                })
            };

        default:
            return { ...state };
    };
};
