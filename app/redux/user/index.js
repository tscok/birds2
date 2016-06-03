/**
 * Action types
 */
const USER_UPDATE = 'USER_UPDATE';
const USER_LOGOUT = 'USER_LOGOUT';


/**
 * Action creators
 */
export const userUpdate = (payload) => {
    return {
        type: USER_UPDATE,
        payload
    };
};

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    };
};


/**
 * Reducer
 */
export const reducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE:
            return {
                ...state,
                ...action.payload
            };

        case USER_LOGOUT:
            state = undefined;
            return { ...state };

        default:
            return { ...state };
    };
};
