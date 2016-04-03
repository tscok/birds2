import moment from 'moment';

export function getStatus(start, end) {
    const now = moment().unix();
    return now > start ? ( now < end ? 'Active' : 'Ended' ) : 'Pending';
};
