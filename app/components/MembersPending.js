import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('members-pending');

const MembersPending = React.createClass({

    propTypes: {
        ownerId: PropTypes.string.isRequired,
        pending: PropTypes.number.isRequired,
        userId: PropTypes.string.isRequired
    },

    render() {
        const { ownerId, pendingCount, userId } = this.props;

        if (ownerId !== userId || pending === 0) {
            return null;
        }

        return (
            <span className={ block() }>{ pending }</span>
        );
    }

});

export default MembersPending;
