import { textbox } from 'js/redux/components/core/actions/textbox';

export default () => {
    return {
        error: {
            message: ''
        },
        form: {
            title: textbox(),
            submitting: false
        }
    };
};
