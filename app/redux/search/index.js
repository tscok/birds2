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
const UPDATE = 'UPDATE';
const RESET = 'RESET';


/**
 * Action creators
 */
export const update = (payload) => {
    return {
        type: UPDATE,
        payload
    };
};

export const reset = () => {
    return {
        type: RESET
    };
};


/**
 * Reducer
 */
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE:
            return {
                ...state,
                ...action.payload
            };

        case RESET:
            state = defaultState;
            return { ...state };

        default:
            return { ...state };
    };
};
