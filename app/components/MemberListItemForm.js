import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('member-list-item-form');

const MemberListItemForm = React.createClass({

    propTypes: {
        memberId: PropTypes.string.isRequired
    },

    render() {
        return (
            <div className={ block() }>
                { this.props.memberId }
            </div>
        );
    }

});

export default MemberListItemForm;
