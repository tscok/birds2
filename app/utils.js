import moment from 'moment';
import debounce from 'lodash.debounce';


const delayAction = debounce((action) => action(), 300);

function getStatus(start, end) {
    const now = moment().unix();
    return now > start ? ( now < end ? 'Active' : 'Ended' ) : 'Pending';
};

function isEmpty(string) {
    return string === '' || string.trim().length === 0;
};

function isDate(string, format='YYYYMMDD') {
    return moment(string, format, true).isValid();
};

export {
    delayAction,
    getStatus,
    isDate,
    isEmpty
};
