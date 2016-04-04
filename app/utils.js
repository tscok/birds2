import moment from 'moment';
import debounce from 'lodash.debounce';


const delayAction = debounce((action) => action(), 300);

function getStatus(start, end) {
    const now = moment().unix();
    return now > start ? ( now < end ? 'Active' : 'Ended' ) : 'Pending';
};

export {
    getStatus,
    delayAction
};
