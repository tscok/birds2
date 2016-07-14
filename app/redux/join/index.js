/**
 * Default state
 */
const defaultState = {};


/**
 * Action types
 */
const JOIN_UPDATE = 'JOIN_UPDATE';
const JOIN_RESET = 'JOIN_RESET';


/**
 * Action creators
 */
export const joinUpdate = (pid, payload) => {
    return {
        type: JOIN_UPDATE,
        pid,
        payload
    };
};

export const joinReset = () => {
    return {
        type: JOIN_RESET
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
                [action.pid]: {
                    ...state[action.pid],
                    ...action.payload
                }
            };

        default:
            return { ...state };
    };
};
