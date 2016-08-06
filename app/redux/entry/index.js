/**
 * Default state
 */
const defaultState = {
    form: {
        age: '',
        sex: '',
        ring: '',
        pjm: '',
        fat: ''
    },
    meta: {
        signs: [],
        type: 'New Ring'
    }
};


/**
 * Action types
 */
const ENTRY_UPDATE = 'ENTRY_UPDATE';
const ENTRY_RESET = 'ENTRY_RESET';


/**
 * Action creators
 */
export const entryUpdate = (branch, payload) => {
    return {
        type: ENTRY_UPDATE,
        branch,
        payload
    };
};

export const entryReset = () => {
    return {
        type: ENTRY_RESET
    };
};


/**
 * Reducer
 */
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ENTRY_UPDATE:
            return {
                ...state,
                [action.branch]: {
                    ...state[action.branch],
                    ...action.payload
                }
            };

        case ENTRY_RESET:
            state = defaultState;    
            return {
                ...state
            };

        default:
            return { ...state };
    }
};
