/**
 * Default state
 */
const defaultState = {
    autocomplete: {
        expanded: false,
        list: []
    },
    form: {
        size: '',
        serial: ''
    },
    sizes: {
        list: [],
        loading: true
    }
};


/**
 * Action types
 */
const RINGS_AUTOCOMPLETE_SELECT = 'RINGS_AUTOCOMPLETE_SELECT';
const RINGS_FORM_RESET = 'RINGS_FORM_RESET';
const RINGS_ITEM_EXPAND = 'RINGS_ITEM_EXPAND';
const RINGS_RESET = 'RINGS_RESET';
const RINGS_UPDATE = 'RINGS_UPDATE';


/**
 * Action creators
 */
export const ringsUpdate = (branch, payload) => {
    return {
        type: RINGS_UPDATE,
        branch,
        payload
    };
};

export const ringsReset = () => {
    return {
        type: RINGS_RESET
    };
};

export const ringsFormReset = () => {
    return {
        type: RINGS_FORM_RESET
    };
};

export const ringsItemExpand = (size, expanded) => {
    return {
        type: RINGS_ITEM_EXPAND,
        size,
        expanded
    };
};

export const ringsAutocompleteSelect = (index, payload) => {
    return {
        type: RINGS_AUTOCOMPLETE_SELECT,
        index,
        payload
    };
};


/**
 * Reducer
 */
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case RINGS_UPDATE:
            return {
                ...state,
                [action.branch]: {
                    ...state[action.branch],
                    ...action.payload
                }
            };

        case RINGS_RESET:
            state = defaultState;
            return {
                ...state
            };

        case RINGS_FORM_RESET:
            return {
                ...state,
                form: defaultState.form
            };

        case RINGS_ITEM_EXPAND:
            return {
                ...state,
                sizes: {
                    ...state.sizes,
                    list: state.sizes.list.map((item) => {
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
                }
            };

        case RINGS_AUTOCOMPLETE_SELECT:
            return {
                ...state,
                autocomplete: {
                    ...state.autocomplete,
                    list: state.autocomplete.list.map((item, index) => {
                        if (index === action.index) {
                            return {
                                ...item,
                                ...action.payload
                            };
                        }
                        return {
                            ...item,
                            selected: false
                        };
                    })
                }
            }

        default:
            return { ...state };
    }
};
