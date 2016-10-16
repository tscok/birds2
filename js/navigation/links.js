export default ({ id } = { id: 'undefined' }) => {
    return {
        'regular': [
            { text: 'My Projects', to: '/projects' },
            { text: 'Create', to: '/create' },
            { text: 'Search', to: '/search' },
        ],
        'project': [
            { text: 'Project', to: `/project/${id}` },
            { text: 'New Entry', to: `/project/${id}/entry` },
            { text: 'Members', to: `/project/${id}/members` },
            { text: 'Rings', to: `/project/${id}/rings` },
            { text: 'Data', to: `/project/${id}/export` }
        ]
    };
};
