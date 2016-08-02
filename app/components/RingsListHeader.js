import React from 'react';
import purebem from 'purebem';


const block = purebem.of('rings-list-header');

const RingsListHeader = React.createClass({

    render() {
        return (
            <div className={ block() }>
                <div className={ block('label', ['size']) }>Size</div>
                <div className={ block('label', ['serial']) }>Serial No.</div>
                <div className={ block('label', ['actions']) }></div>
            </div>
        );
    }

});

export default RingsListHeader;
