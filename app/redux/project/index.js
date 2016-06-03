/**
 * Default state
 */
const projectState = {
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
const PROJECT_UPDATE = 'PROJECT_UPDATE';
const PROJECT_RESET = 'PROJECT_RESET';
const PROJECT_PRIVACY = 'PROJECT_PRIVACY';


/**
 * Actions creators
 */
export const projectUpdate = (field, payload) => {
    return {
        type: PROJECT_UPDATE,
        field,
        payload
    };
};

export const projectReset = () => {
    return {
        type: PROJECT_RESET
    };
};

export const projectPrivacy = (payload) => {
    return {
        type: PROJECT_PRIVACY,
        payload
    };
};


/**
 * Reducer
 */
export const reducer = (state = projectState, action) => {
    switch (action.type) {
        case PROJECT_UPDATE:
            return {
                ...state,
                [action.field]: action.payload
            };

        case PROJECT_PRIVACY:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload
                }
            };

        case PROJECT_RESET:
            state = undefined;
            return { ...state };

        default:
            return { ...state };
    };
};
