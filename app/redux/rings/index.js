/**
 * Default state
 */
const defaultState = {
    autocomplete: [],
    form: {
        size: '',
        serial: ''
    },
    list: [],
    loading: true
};


/**
 * Action types
 */
const RINGS_FORM_RESET = 'RINGS_FORM_RESET';
const RINGS_FORM_UPDATE = 'RINGS_FORM_UPDATE';
const RINGS_UPDATE = 'RINGS_UPDATE';
const RINGS_ITEM_EXPAND = 'RINGS_ITEM_EXPAND';


/**
 * Action creators
 */
export const ringsFormReset = () => {
    return {
        type: RINGS_FORM_RESET
    };
};

export const ringsFormUpdate = (payload) => {
    return {
        type: RINGS_FORM_UPDATE,
        payload
    };
};

export const ringsUpdate = (payload) => {
    return {
        type: RINGS_UPDATE,
        payload
    };
};

export const ringsItemExpand = (size, expanded) => {
    return {
        type: RINGS_ITEM_EXPAND,
        size,
        expanded
    };
};


/**
 * Reducer
 */
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case RINGS_FORM_RESET:
            return {
                ...state,
                form: defaultState.form
            };

        case RINGS_FORM_UPDATE:
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.payload
                }
            };

        case RINGS_UPDATE:
            return {
                ...state,
                ...action.payload
            };

        case RINGS_ITEM_EXPAND:
            return {
                ...state,
                list: state.list.map((item) => {
                    if (item.size === action.size) {
                        return {
                            ...item,
                            ...action.expanded
                        };
                    }
                    return {
                        ...item,
                        expanded: false
                    };
                })
            };

        default:
            return { ...state };
    }
};
