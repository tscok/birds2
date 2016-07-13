/**
 * Default state
 */
const profileState = {
    isLoading: true,
    projects: null
};


/**
 * Action types
 */
const UPDATE = 'UPDATE';


/**
 * Action creators
 */
export const update = (payload) => {
    return {
        type: UPDATE,
        payload
    };
};


/**
 * Reducer
 */
export const reducer = (state = profileState, action) => {
    switch (action.type) {
        case UPDATE:
            return {
                ...state,
                ...action.payload
            };

        default:
            return { ...state };
    };
};
