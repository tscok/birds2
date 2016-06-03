import { combineReducers } from 'redux';
import { USER_UPDATE, USER_LOGOUT, MENU_UPDATE, PROJECT_UPDATE, PROJECT_RESET, PROJECT_PRIVACY, SEARCH_UPDATE } from './actions';


const user = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE:
            return {
                ...state,
                ...action.payload
            };

        case USER_LOGOUT:
            state = undefined;
            return { ...state };

        default:
            return { ...state };
    };
};

const menuState = {
    main: {
        expanded: false
    },
    user: {
        expanded: false
    }
};

const menu = (state = menuState, action) => {
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

const projectState = {
    data: {
        dateEnd: '',
        dateStart: '',
        isPublic: true,
        title: ''
    },
    errorMessage: '',
    isSubmitting: false,
    isSuccess: false,
    isValid: {
        dateEnd: false,
        dateStart: false,
        title: false
    },
    pid: '',
    types: ['Public', 'Private']
};

const project = (state = projectState, action) => {
    switch (action.type) {
        case PROJECT_UPDATE:
            return {
                ...state,
                [action.field]: action.payload
            };

        case PROJECT_PRIVACY:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload
                }
            };

        case PROJECT_RESET:
            state = undefined;
            return { ...state };

        default:
            return { ...state };
    };
};

const searchState = {
    data: {},
    isSearching: false,
    keyword: '',
    results: []
}

const search = (state = searchState, action) => {
    switch (action.type) {
        case SEARCH_UPDATE:
            return {
                ...state,
                ...action.payload
            };

        default:
            return { ...state };
    };
};

const rootReducer = combineReducers({
    user,
    menu,
    project,
    search
});

export default rootReducer;
