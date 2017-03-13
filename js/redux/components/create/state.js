import { textbox } from 'js/redux/components/core/actions/textbox';

export default () => {
    return {
        form: {
            endDate: textbox(),
            error: '',
            isPublic: true,
            isSubmitting: false,
            startDate: textbox(),
            title: textbox()
        },
        isSuccess: false
    };
};
