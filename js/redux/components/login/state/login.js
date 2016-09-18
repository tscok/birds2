import { textbox } from 'js/redux/components/core/actions/textbox';

export default () => {
    return {
        form: {
            username: textbox(),
            password: textbox(),
            submitting: false
        },
        facebook: {
            submitting: false
        }
    };
};
