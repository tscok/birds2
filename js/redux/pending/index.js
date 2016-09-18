/**
 * Default state
 */
const defaultState = {};


/**
 * Action types
 */
const PENDING_UPDATE = 'PENDING_UPDATE';


/**
 * Action creators
 */
export const pendingUpdate = (pid, payload) => {
    return {
        type: PENDING_UPDATE,
        pid,
        payload
    };
};


/**
 * Reducer
 */
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case PENDING_UPDATE:
            return {
                ...state,
                [action.pid]: {
                    ...action.payload
                }
            };

        default:
            return { ...state };
    }
};
