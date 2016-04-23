import moment from 'moment';
import debounce from 'lodash.debounce';

const body = document.querySelector('body');
const delayAction = debounce(action => action(), 300);

function getStatus(start, end) {
    const now = moment().unix();
    return now > start ? ( now < end ? 'active' : 'ended' ) : 'coming';
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

function overlayAdd() {
    const lockScroll = document.body.clientHeight >= document.documentElement.clientHeight;
    body.className = 'overlay';
    body.style.overflowY = lockScroll ? 'scroll' : '';
};

function overlayRemove() {
    body.removeAttribute('class');
    body.removeAttribute('style');
};

export {
    capitalize,
    delayAction,
    getStatus,
    isDate,
    isEmpty,
    overlayAdd,
    overlayRemove,
    sortByKey
};
