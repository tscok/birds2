import React, { PropTypes } from 'react';
import purebem from 'purebem';

import TableRow from './TableRow';


const block = purebem.of('table');

const Table = React.createClass({

    propTypes: {
        data: PropTypes.array.isRequired,
        headers: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired
    },

    renderHeader() {
        return (
            <TableRow
                headers={ this.props.headers }
                isHeader={ true } />
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
                onClick={ this.props.onClick } />
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
