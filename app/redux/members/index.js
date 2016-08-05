/**
 * Default state
 */
const defaultState = {
    loading: true,
    members: []
};


/**
 * Action types
 */
const MEMBER_EXPAND = 'MEMBER_EXPAND';
const MEMBER_UPDATE = 'MEMBER_UPDATE';
const MEMBERS_RESET = 'MEMBERS_RESET';
const MEMBERS_UPDATE = 'MEMBERS_UPDATE';


/**
 * Action creators
 */
export const membersUpdate = (payload) => {
    return {
        type: MEMBERS_UPDATE,
        payload
    };
};

export const membersReset = () => {
    return {
        type: MEMBERS_RESET
    };
};

export const  memberUpdate = (uid, payload) => {
    return {
        type: MEMBER_UPDATE,
        uid,
        payload
    };
};

export const memberExpand = (uid, expanded) => {
    return {
        type: MEMBER_EXPAND,
        uid,
        expanded
    };
};


/**
 * Reducer
 */
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case MEMBERS_UPDATE:
            return {
                ...state,
                ...action.payload
            };

        case MEMBERS_RESET:
            state = defaultState;
            return {
                ...state
            };

        case MEMBER_UPDATE:
            return {
                ...state,
                members: state.members.map((member) => {
                    if (member.uid === action.uid) {
                        return {
                            ...member,
                            ...action.payload
                        };
                    }
                    return member;
                })
            };

        case MEMBER_EXPAND:
            return {
                ...state,
                members: state.members.map((member) => {
                    if (member.uid === action.uid) {
                        return {
                            ...member,
                            ...action.expanded
                        };
                    }
                    return {
                        ...member,
                        expanded: false
                    };
                })
            }

        default:
            return { ...state };
    }
};
