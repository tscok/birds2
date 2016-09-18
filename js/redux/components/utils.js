export function getPath({ root, path } = {}) {
    return root.split('.').concat(path.split('.'));
};
