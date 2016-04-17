import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { capitalize } from 'app/utils';

import Avatar from './Avatar';
import Join from './Join';


const block = purebem.of('table');

const TableCol = React.createClass({

    propTypes: {
        label: PropTypes.string.isRequired,
        // ...
        data: PropTypes.object,
        isFirst: PropTypes.bool,
        isLast: PropTypes.bool
    },

    getDefaultProps() {
        return {
            data: null,
            isFirst: false,
            isLast: false
        };
    },

    renderAvatar(data, label) {
        if (!data || label !== 'avatar') {
            return null;
        }
        return (<Avatar name={ data.title } status={ data.status } />);
    },

    renderJoin(data, label) {
        if (!data || label !== 'join') {
            return null;
        }
        return (<Join data={ data } />);
    },

    render() {
        const { data, isFirst, isLast, label } = this.props;
        const status = data ? data.status : null;
        const value = data && data[label] ? data[label] : label;

        return (
            <div className={ block('col', { label, status, first: isFirst, last: isLast }) }>
                <div className={ block('label') }>{ label }</div>
                <div className={ block('value') }>{ value }</div>
                { this.renderAvatar(data, label) }
                { this.renderJoin(data, label) }
            </div>
        );
    }

});

export default TableCol;
