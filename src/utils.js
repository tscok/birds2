import moment from 'moment';
import purebem from 'purebem';


const body = document.querySelector('body');

export function noop(){};

export function getStatus(start, end) {
    const now = moment().unix();
    return now > start ? ( now < end ? 'active' : 'ended' ) : 'coming';
};

export function isDate(str, format='YYYYMMDD') {
    return moment(str, format, true).isValid();
};

export function isEmpty(str) {
    return str === '' || str.trim().length === 0;
};

export function isNullOrEmpty(val) {
    return val === '' || val === null || val === void(0);
};

export function capitalize(str) {
    if (isEmpty(str)) {
        return str;
    }
    return str[0].toUpperCase() + str.substr(1);
};

export function sortByKey(arr, key) {
    return arr.sort((a, b) => {
        return a[key].localeCompare(b[key]);
    });
};

export function overlayAdd(modifier) {
    const block = purebem.of('overlay');
    const lockScroll = document.body.clientHeight >= document.documentElement.clientHeight;
    body.className = block({ modifier });
    body.style.overflowY = lockScroll ? 'scroll' : '';
};

export function overlayRemove() {
    body.removeAttribute('class');
    body.removeAttribute('style');
};
