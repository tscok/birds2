import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { noop } from 'app/utils';


const block = purebem.of('list-item');

const ListItem = React.createClass({

    propTypes: {
        title: PropTypes.any,
        body: PropTypes.any,
        aside: PropTypes.any,
        className: PropTypes.string,
        modifier: PropTypes.string,
        onClick: PropTypes.func,
        children: PropTypes.node
    },

    getDefaultProps() {
        return {
            title: null,
            body: null,
            aside: null,
            className: '',
            modifier: '',
            onClick: noop,
            children: null
        };
    },

    handleClick() {
        this.props.onClick();
    },

    renderChildren() {
        if (!this.props.children) {
            return null;
        }
        return (
            <div className={ block('expanded') }>
                { this.props.children }
            </div>
        );
    },

    render() {
        const { title, body, aside, className, modifier, onClick } = this.props;
        const classNames = purebem.many(block({ modifier }), className);
        return (
            <div className={ classNames } onClick={ this.handleClick }>
                <div className={ block('summary') }>
                    <div className={ block('main') }>
                        <div className={ block('title') }>
                            { title }
                        </div>
                        <div className={ block('body') }>
                            { body }
                        </div>
                    </div>
                    <div className={ block('aside') }>
                        { aside }
                    </div>
                </div>
                { this.renderChildren() }
            </div>
        );
    }

});

export default ListItem;
