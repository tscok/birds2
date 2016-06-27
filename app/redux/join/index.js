/**
 * Default state
 */
const defaultState = {
    loading: true
};


/**
 * Action types
 */
const JOIN_UPDATE = 'JOIN_UPDATE';


/**
 * Action creators
 */
export const roleUpdate = (payload) => {
    return {
        type: JOIN_UPDATE,
        payload
    };
};


/**
 * Reducer
 */
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case JOIN_UPDATE:
            return {
                ...state,
                ...action.payload
            };

        default:
            return { ...state };
    };
};
