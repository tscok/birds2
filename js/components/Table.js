import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { noop } from 'app/utils';
import { TableRow } from 'app/components';


const block = purebem.of('table');

const Table = React.createClass({

    propTypes: {
        data: PropTypes.array.isRequired,
        headers: PropTypes.array.isRequired,
        onClick: PropTypes.func
    },

    getDefaultProps() {
        return {
            onClick: noop
        };
    },

    renderHeader() {
        return (
            <TableRow
                headers={ this.props.headers }
                type="header" />
        );
    },

    renderBody(row, index, list) {
        const isFirst = index === 0;
        const isLast = index === list.length - 1;

        return (
            <TableRow
                data={ row }
                headers={ this.props.headers }
                isFirst={ isFirst }
                isLast={ isLast }
                key={ index }
                onClick={ this.props.onClick }
                type="body" />
        );
    },

    render() {
        return (
            <div className={ block() }>
                { this.renderHeader() }
                {
                    [].map.call(this.props.data, this.renderBody)
                }
            </div>
        );
    }

});

export default Table;
