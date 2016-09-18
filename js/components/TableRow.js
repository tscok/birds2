import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { noop } from 'app/utils';
import { TableCol } from 'app/components';


const block = purebem.of('table');

const TableRow = React.createClass({

    propTypes: {
        headers: PropTypes.array.isRequired,
        type: PropTypes.string.isRequired,
        // ...
        data: PropTypes.object,
        isFirst: PropTypes.bool,
        isLast: PropTypes.bool,
        onClick: PropTypes.func
    },

    getDefaultProps() {
        return {
            data: null,
            onClick: noop
        };
    },

    handleClick() {
        if (!this.props.data) {
            return;
        }
        this.props.onClick(this.props.data.id);
    },
    
    renderColumn(label, index, headers) {
        const isFirst = index === 0;
        const isLast = index === headers.length - 1;

        return (
            <TableCol
                data={ this.props.data }
                isFirst={ isFirst }
                isLast={ isLast }
                key={ index }
                label={ label }
            />
        );
    },

    render() {
        const { data, isFirst, isLast, onClick, type } = this.props;

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
