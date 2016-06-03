/**
 * action types
 */

export const USER_UPDATE = 'USER_UPDATE';
export const USER_LOGOUT = 'USER_LOGOUT';

export const MENU_UPDATE = 'MENU_UPDATE';

export const PROJECT_UPDATE = 'PROJECT_UPDATE';
export const PROJECT_RESET = 'PROJECT_RESET';
export const PROJECT_PRIVACY = 'PROJECT_PRIVACY';

export const SEARCH_UPDATE = 'SEARCH_UPDATE';

/**
 * action creators
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

export const menuUpdate = (component, payload) => {
    return {
        type: MENU_UPDATE,
        component,
        payload
    };
};

export const projectUpdate = (field, payload) => {
    return {
        type: PROJECT_UPDATE,
        field,
        payload
    };
};

export const projectReset = () => {
    return {
        type: PROJECT_RESET
    };
};

export const projectPrivacy = (payload) => {
    return {
        type: PROJECT_PRIVACY,
        payload
    };
};

export const searchUpdate = (payload) => {
    return {
        type: SEARCH_UPDATE,
        payload
    };
};
