import get from 'lodash.get';


export function getPath({ root, path } = {}) {
    return root.split('.').concat(path.split('.'));
};

export function getComponent(state, props) {
    return get(state, getPath({ ...props }));
};
