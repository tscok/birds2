import React, { PropTypes } from 'react';


const MembersView = React.createClass({

    propTypes: {
        auth: PropTypes.string,
        root: PropTypes.string
    },

    render() {
        return (
            <div>
                <h1>MembersView</h1>
            </div>
        );
    }

});

export default MembersView;