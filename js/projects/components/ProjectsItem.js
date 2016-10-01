import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('projects-item');

const ProjectsItem = React.createClass({

    propTypes: {
        item: PropTypes.object.isRequired
    },

    render() {
        const { item } = this.props;

        console.log(item);

        return (
            <div className={ block() }>{ item.title }</div>
        );
    }

});

export default ProjectsItem;
