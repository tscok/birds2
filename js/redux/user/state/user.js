export default ({
    email = '',
    name = '',
    photoUrl = '',
    provider = '',
    uid = '',
    wait = true
} = {}) => {
    return {
        email,
        name,
        photoUrl,
        provider,
        uid,
        wait
    };
};
