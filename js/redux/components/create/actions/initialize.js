import create from 'js/redux/components/create/state/create';


const type = 'CREATE.INITIALIZE';

export default () => {
    return {
        type
    };
};

export const reducer = {
    [type]: (state) => {
        return state.setIn(['create'], create());
    }
};
