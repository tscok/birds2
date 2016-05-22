import moment from 'moment';
import purebem from 'purebem';
import Firebase from 'firebase';
import { debounce } from './lodash';


const body = document.querySelector('body');
const debouncer = debounce(action => action(), 300);
const firebaseRef = new Firebase('https://birds.firebaseio.com');


function noop(){};

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

function overlayAdd(modifier='') {
    const block = purebem.of('overlay');
    const lockScroll = document.body.clientHeight >= document.documentElement.clientHeight;
    body.className = block({ modifier });
    body.style.overflowY = lockScroll ? 'scroll' : '';
};

function overlayRemove() {
    body.removeAttribute('class');
    body.removeAttribute('style');
};


export {
    capitalize,
    debouncer,
    firebaseRef,
    getStatus,
    isDate,
    isEmpty,
    noop,
    overlayAdd,
    overlayRemove,
    sortByKey
};
