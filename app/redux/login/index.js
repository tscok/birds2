/**
 * Default state
 */
const defaultState = {
    error: '',
    loading: false,
    password: '',
    username: ''
};


/**
 * Action types
 */
const LOGIN_UPDATE = 'LOGIN_UPDATE';


/**
 * Action creators
 */
export const loginUpdate = (payload) => {
    return {
        type: LOGIN_UPDATE,
        payload
    };
};


/**
 * Reducer
 */
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_UPDATE:
            return {
                ...state,
                ...action.payload
            };

        default:
            return { ...state };
    };
};
