const dropdown = ({ ...overrides } = {}) => {
    return {
        expanded: false,
        list: [],
        ...overrides
    };
};

dropdown.update = (overrides) => {
    return dropdown({ ...overrides });
}

/**
 * Default state
 */
const defaultState = {
    form: {
        age: '',
        fat: '',
        pjm: '',
        ringNo: '',
        sex: ''
    },
    meta: {
        signs: dropdown(),
        type: 'New Ring'
    }
};


/**
 * Action types
 */
const ENTRY_UPDATE = 'ENTRY_UPDATE';
const ENTRY_RESET = 'ENTRY_RESET';
const ENTRY_FORM_RESET = 'ENTRY_FORM_RESET';
const ENTRY_COMPONENT_UPDATE = 'ENTRY_COMPONENT_UPDATE';


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

export const entryComponentUpdate = (branch, component, payload) => {
    return {
        type: ENTRY_COMPONENT_UPDATE,
        branch,
        component,
        payload
    };
};

export const entryReset = () => {
    return {
        type: ENTRY_RESET
    };
};

export const entryFormReset = () => {
    return {
        type: ENTRY_FORM_RESET
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

        case ENTRY_COMPONENT_UPDATE:
            return {
                ...state,
                [action.branch]: {
                    ...state[action.branch],
                    signs: dropdown.update(action.payload)
                    // [action.component]: action.component.update(action.payload)
                }
            };

        case ENTRY_RESET:
            state = defaultState;    
            return {
                ...state
            };

        case ENTRY_FORM_RESET:
            return {
                ...state,
                form: defaultState.form
            };

        default:
            return { ...state };
    }
};
