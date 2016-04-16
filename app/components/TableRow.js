import React, { PropTypes } from 'react';
import purebem from 'purebem';

import noop from 'app/noop';

import Avatar from './Avatar';
import TableCol from './TableCol';


const block = purebem.of('table');

const TableRow = React.createClass({

    propTypes: {
        headers: PropTypes.array.isRequired,
        // ...
        data: PropTypes.object,
        isFirst: PropTypes.bool,
        isHeader: PropTypes.bool,
        isLast: PropTypes.bool,
        onClick: PropTypes.func
    },

    getDefaultProps() {
        return {
            data: null,
            isHeader: false,
            onClick: noop
        };
    },

    handleClick() {
        if (this.props.isHeader || !this.props.data) {
            return;
        }

        this.props.onClick(this.props.data.id);
    },

    renderAvatar(label) {
        const { data } = this.props;

        if (!data || label !== 'avatar') {
            return null;
        }

        return (
            <Avatar name={ data.title } status={ data.status } />
        );
    },
    
    renderColumn(label, index,  headers) {
        const { data } = this.props;
        const value = data ? data[label] : label;
        const status = data && label === 'status' ? data['status'] : '';

        const isFirst = index === 0;
        const isLast = index === headers.length - 1;

        return (
            <TableCol key={ index } label={ label } value={ value } isFirst={ isFirst } isLast={ isLast } status={ status }>
                { this.renderAvatar(label) }
            </TableCol>
        );
    },

    render() {
        const { data, isFirst, isLast, isHeader, onClick } = this.props;
        const type = isHeader ? 'header' : 'body';

        return (
            <div className={ block('row', { type, first: isFirst, last: isLast }) } onClick={ this.handleClick }>
                {
                    [].map.call(this.props.headers, this.renderColumn)
                }
            </div>
        );
    }

});

export default TableRow;
