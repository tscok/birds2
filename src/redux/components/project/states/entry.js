import { option } from 'src/redux/core/actions/radio';
import { tab } from 'src/redux/core/actions/tab';
import { textbox } from 'src/redux/core/actions/textbox';

export default () => {
    return {
        form: {
            age: {
                options: [
                    option({ label: '1.0', active: true }),
                    option({ label: '2.0' }),
                    option({ label: '2+' }),
                    option({ label: '3+' })
                ],
                value: ''
            },
            arm: textbox(),
            comment: '',
            fat: textbox(),
            hand: textbox(),
            net: textbox(),
            pjm: textbox(),
            ringId: textbox(),
            ringNo: textbox(),
            ringSize: textbox(),
            sex: textbox(),
            sign: textbox(),
            species: textbox(),
            weight: textbox(),
            wing: textbox(),
        },
        tabs: {
            new: tab({ active: true }),
            old: tab()
        },
    };
};
