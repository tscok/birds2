import moment from 'moment';
import debounce from 'lodash.debounce';


const delayAction = debounce(action => action(), 300);

function getStatus(start, end) {
    const now = moment().unix();
    return now > start ? ( now < end ? 'Active' : 'Ended' ) : 'Pending';
};

function isEmpty(str) {
    return str === '' || str.trim().length === 0;
};

function isDate(str, format='YYYYMMDD') {
    return moment(str, format, true).isValid();
};

function capitalize(str) {
    return str[0].toUpperCase() + str.substr(1);
};

function sortByKey(arr, key) {
    return arr.sort((a, b) => {
        return a[key].localeCompare(b[key]);
    });
};

export {
    capitalize,
    delayAction,
    getStatus,
    isDate,
    isEmpty,
    sortByKey
};
