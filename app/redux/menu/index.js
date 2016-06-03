/**
 * Default state
 */
const menuState = {
    main: {
        expanded: false
    },
    user: {
        expanded: false
    }
};


/**
 * Action types
 */
const MENU_UPDATE = 'MENU_UPDATE';


/**
 * Action creators
 */
export const menuUpdate = (component, payload) => {
    return {
        type: MENU_UPDATE,
        component,
        payload
    };
};


/**
 * Reducer
 */
export const reducer = (state = menuState, action) => {
    switch (action.type) {
        case MENU_UPDATE:
            return {
                ...state,
                [action.component]: {
                    ...action.payload
                }
            };

        default:
            return { ...state };
    };
};
