import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('view-header');

const ViewHeader = React.createClass({

    propTypes: {
        title: PropTypes.string.isRequired,
        // ...
        children: PropTypes.node
    },

    getDefaultProps() {
        return {
            children: null
        };
    },

    render() {
        return (
            <div className={ block() }>
                <div className={ block('title') }>{ this.props.title }</div>
                <div className={ block('body') }>
                    { this.props.children }
                </div>
            </div>
        );
    }

});

export default ViewHeader;
