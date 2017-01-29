import React, { PropTypes } from 'react';


const DashboardView = React.createClass({

    propTypes: {
        auth: PropTypes.object,
        root: PropTypes.string
    },

    render() {
        return (
            <div>
                <h1>DashboardView</h1>
            </div>
        );
    }

});

export default DashboardView;