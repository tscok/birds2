/**
 * Default state
 */
const defaultState = {
    data: {
        dateEnd: '',
        dateStart: '',
        title: '',
        type: 'Public'
    },
    error: {
        dateEnd: false,
        dateStart: false,
        title: false
    },
    errorMessage: '',
    isSubmitting: false,
    isSuccess: false,
    pid: '',
    types: ['Public', 'Private']
};


/**
 * Action types
 */
const PROJECT_ERRORS = 'PROJECT_ERRORS';
const PROJECT_RESET = 'PROJECT_RESET';
const PROJECT_UPDATE = 'PROJECT_UPDATE';


/**
 * Actions creators
 */
export const projectErrors = (payload) => {
    return {
        type: PROJECT_ERRORS,
        payload
    }
}

export const projectReset = () => {
    return {
        type: PROJECT_RESET
    };
};

export const projectUpdate = (payload) => {
    return {
        type: PROJECT_UPDATE,
        payload
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
                data: {
                    ...state.data,
                    ...action.payload
                }
            };

        case PROJECT_ERRORS:
            return {
                ...state,
                error: {
                    ...state.data,
                    ...action.payload
                }
            };

        case PROJECT_RESET:
            state = defaultState;
            return { ...state };

        default:
            return { ...state };
    };
};
