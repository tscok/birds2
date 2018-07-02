export default (id = null) => {
    const links = {
        'regular': [
            { text: 'My Projects', to: '/projects' },
            { text: 'Create', to: '/create' },
            { text: 'Search', to: '/search' },
        ],
        'project': [
            { text: 'Project', to: `/project/${id}/dashboard` },
            { text: 'New Entry', to: `/project/${id}/entry` },
            { text: 'Members', to: `/project/${id}/members` },
            { text: 'Rings', to: `/project/${id}/rings` },
            { text: 'Export', to: `/project/${id}/export` }
        ]
    };

    return !!id ? links.project : links.regular;
};
