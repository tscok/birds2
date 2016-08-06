import moment from 'moment';
import purebem from 'purebem';
import isstring from 'lodash.isstring';
import { debounce } from './lodash';


const body = document.querySelector('body');
const debouncer = debounce(action => action(), 300);


export function noop(){};

export function getStatus(start, end) {
    const now = moment().unix();
    return now > start ? ( now < end ? 'active' : 'ended' ) : 'coming';
};

export function isString(str) {
    // return !!str && str.trim() !== '';
    return isstring(str);
};

export function isEmpty(str) {
    return str === '' || str.trim().length === 0;
};

export function isDate(str, format='YYYYMMDD') {
    return moment(str, format, true).isValid();
};

export function capitalize(str) {
    if (!isString(str)) {
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


export {
    capitalize,
    debouncer,
    getStatus,
    isDate,
    isEmpty,
    noop,
    overlayAdd,
    overlayRemove,
    sortByKey
};
