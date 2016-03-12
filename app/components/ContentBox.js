import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('content-box');

const ContentBox = React.createClass({

    propTypes: {
        children: PropTypes.node.isRequired,
        // ...
        background: PropTypes.string,
        shadow: PropTypes.bool,
        title: PropTypes.string
    },

    getDefaultProps() {
        return {
            background: '',
            shadow: false,
            title: ''
        };
    },

    renderTitle() {
        if (this.props.title === '') {
            return null;
        }

        return (
            <h5 className={ block('title') }>{ this.props.title }</h5>
        );
    },

    render() {
        const { background, shadow, title } = this.props;

        return (
            <div className={ block({ background, shadow }) }>
                { this.renderTitle() }
                { this.props.children }
            </div>
        );
    }

});

export default ContentBox;