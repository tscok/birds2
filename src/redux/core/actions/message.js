const type = 'MESSAGE.CHANGE';

export default ({ message, type }) => {
    return {
        type,
        payload: { message, type }
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['message'], action.payload);
    }
};
