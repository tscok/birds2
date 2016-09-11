import { textbox } from 'app/redux/components/core/actions/textbox';

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
