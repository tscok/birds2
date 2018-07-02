import entry from './states/entry';

export default ({ id = '' } = {}) => {
    return {
        entry: entry(),
        id
    };
};
