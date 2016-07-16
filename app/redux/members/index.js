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
const MEMBERS_UPDATE = 'MEMBERS_UPDATE';
const MEMBER_UPDATE = 'MEMBER_UPDATE';


/**
 * Action creators
 */
export const membersUpdate = (payload) => {
    return {
        type: MEMBERS_UPDATE,
        payload
    };
};

export const  memberUpdate = (uid, payload) => {
    return {
        type: MEMBER_UPDATE,
        uid,
        payload
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

        default:
            return { ...state };
    }
};
