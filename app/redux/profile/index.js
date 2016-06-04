/**
 * Default state
 */
const profileState = {
    activeTab: 'owner',
    isLoading: true,
    projects: null
};


/**
 * Action types
 */
const PROFILE_UPDATE = 'PROFILE_UPDATE';


/**
 * Action creators
 */
export const profileUpdate = (payload) => {
    return {
        type: PROFILE_UPDATE,
        payload
    };
};


/**
 * Reducer
 */
export const reducer = (state = profileState, action) => {
    switch (action.type) {
        case PROFILE_UPDATE:
            return {
                ...state,
                ...action.payload
            };

        default:
            return { ...state };
    };
};
