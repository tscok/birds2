/**
 * Default state
 */
const defaultState = {
    isLoading: true,
    project: null
};


/**
 * Action types
 */
const PROJECT_UPDATE = 'PROJECT_UPDATE';
const PROJECT_RESET = 'PROJECT_RESET';


/**
 * Action creators
 */
export const projectUpdate = (payload) => {
    return {
        type: PROJECT_UPDATE,
        payload
    };
};

export const projectReset = () => {
    return {
        type: PROJECT_RESET
    };
};


/**
 * Reducer
 */
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case PROJECT_UPDATE:
            return {
                ...state,
                ...action.payload
            };

        case PROJECT_RESET:
            state = defaultState;
            return { ...state };

        default:
            return { ...state };
    };
};
