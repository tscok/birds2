import { textbox } from 'js/redux/components/core/actions/textbox';

export default () => {
    return {
        button: {},
        keyword: textbox(),
        result: [],
        searching: false
    };
};
