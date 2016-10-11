import { textbox } from 'js/redux/components/core/actions/textbox';

export default () => {
    return {
        keyword: textbox(),
        result: [],
        searching: false
    };
};
