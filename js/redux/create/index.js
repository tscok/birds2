/**
 * Default state
 */
const defaultState = {
    error: '',
    isValid: {
        dateEnd: false,
        dateStart: false,
        title: false
    },
    project: {
        dateEnd: '',
        dateStart: '',
        title: '',
        type: 'Public',
        id: ''
    },
    types: ['Public', 'Private']
};


/**
 * Action types
 */
const CREATE_ERROR = 'CREATE_ERROR';
const CREATE_RESET = 'CREATE_RESET';
const CREATE_UPDATE = 'CREATE_UPDATE';


/**
 * Actions creators
 */
export const createError = (message='') => {
    return {
        type: CREATE_ERROR,
        message
    };
}

export const createReset = () => {
    return {
        type: CREATE_RESET
    };
};

export const createUpdate = (branch, payload) => {
    return {
        type: CREATE_UPDATE,
        branch,
        payload
    };
};


/**
 * Reducer
 */
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case CREATE_ERROR:
            return {
                ...state,
                ...state.error = action.message
            };

        case CREATE_UPDATE:
            return {
                ...state,
                [action.branch]: {
                    ...state[action.branch],
                    ...action.payload
                }
            };

        case CREATE_RESET:
            state = defaultState;
            return { ...state };

        default:
            return { ...state };
    };
};
