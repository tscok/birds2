import { textbox } from 'src/redux/core/actions/textbox';

export default () => {
    return {
        button: {},
        keyword: textbox(),
        result: [],
        searching: false
    };
};
