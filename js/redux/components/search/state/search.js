import { textbox } from 'js/redux/components/core/actions/textbox';

export default () => {
    return {
        keyword: textbox(),
        loading: false,
        result: []
    };
};
