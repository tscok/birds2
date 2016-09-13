import menu from 'app/redux/components/menu/state/menu';


const type = 'MENU.INITIALIZE';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state, action) => {
        return state.setIn(['menu'], menu());
    }
};
