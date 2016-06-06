/**
 * Default state
 */
const defaultState = {
    data: {
        dateEnd: '',
        dateStart: '',
        isPublic: true,
        title: ''
    },
    errorMessage: '',
    isSubmitting: false,
    isSuccess: false,
    isValid: {
        dateEnd: false,
        dateStart: false,
        title: false
    },
    pid: '',
    types: ['Public', 'Private']
};


/**
 * Action types
 */
const CREATE_UPDATE = 'CREATE_UPDATE';
const CREATE_RESET = 'CREATE_RESET';
const CREATE_PRIVACY = 'CREATE_PRIVACY';


/**
 * Actions creators
 */
export const createUpdate = (field, payload) => {
    return {
        type: CREATE_UPDATE,
        field,
        payload
    };
};

export const createReset = () => {
    return {
        type: CREATE_RESET
    };
};

export const createPrivacy = (payload) => {
    return {
        type: CREATE_PRIVACY,
        payload
    };
};


/**
 * Reducer
 */
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case CREATE_UPDATE:
            return {
                ...state,
                [action.field]: action.payload
            };

        case CREATE_PRIVACY:
            return {
                ...state,
                data: {
                    ...state.data,
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
