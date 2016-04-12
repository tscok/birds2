import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('content-box');

const ContentBox = React.createClass({

    propTypes: {
        children: PropTypes.node.isRequired,
        // ...
        filled: PropTypes.bool,
        title: PropTypes.string
    },

    getDefaultProps() {
        return {
            filled: true,
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
        const { filled, title } = this.props;

        return (
            <div className={ block({ filled }) }>
                { this.renderTitle() }
                { this.props.children }
            </div>
        );
    }

});

export default ContentBox;