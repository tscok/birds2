/**
 * Default state
 */
const defaultState = {
    error: '',
    isSubmitting: false,
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
const ERROR = 'ERROR';
const RESET = 'RESET';
const UPDATE = 'UPDATE';
const SUCCESS = 'SUCCESS';


/**
 * Actions creators
 */
export const error = (message='') => {
    return {
        type: ERROR,
        message
    };
}

export const reset = () => {
    return {
        type: RESET
    };
};

export const update = (root, payload) => {
    return {
        type: UPDATE,
        root,
        payload
    };
};


/**
 * Reducer
 */
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                ...state.error = action.message
            };

        case UPDATE:
            return {
                ...state,
                [action.root]: {
                    ...state[action.root],
                    ...action.payload
                }
            };

        case RESET:
            state = defaultState;
            return { ...state };

        default:
            return { ...state };
    };
};
